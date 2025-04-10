
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import hashlib

app = Flask(__name__)
CORS(app)

# Database setup
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    with open('schema.sql') as f:
        conn.executescript(f.read())
    
    # Add the mock users to the database
    password_muser = hashlib.sha256("muser".encode()).hexdigest()
    password_mvc = hashlib.sha256("mvc".encode()).hexdigest()
    
    conn.execute('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                 ('muser', 'muser@example.com', password_muser, 'user'))
    conn.execute('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                 ('mvc', 'mvc@example.com', password_mvc, 'admin'))
    conn.commit()
    conn.close()

# Create the database if it doesn't exist
if not os.path.exists('database.db'):
    print("Creating database...")
    init_db()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    conn = get_db_connection()
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    
    user = conn.execute('SELECT id, username, role FROM users WHERE username = ? AND password = ?',
                       (username, hashed_password)).fetchone()
    conn.close()
    
    if user:
        return jsonify({
            "user": {
                "id": user['id'],
                "username": user['username'],
                "role": user['role']
            },
            "message": "Login successful"
        })
    
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email', '')
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    conn = get_db_connection()
    
    # Check if username already exists
    existing_user = conn.execute('SELECT id FROM users WHERE username = ?', (username,)).fetchone()
    if existing_user:
        conn.close()
        return jsonify({"error": "Username already exists"}), 409
    
    # Hash the password
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    
    # Insert new user
    conn.execute('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                (username, email, hashed_password, 'user'))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "User registered successfully"})

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    users = conn.execute('SELECT id, username, email, role, created_at FROM users').fetchall()
    conn.close()
    
    user_list = [dict(user) for user in users]
    return jsonify(user_list)

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    conn = get_db_connection()
    
    # Check if user exists
    user = conn.execute('SELECT id FROM users WHERE id = ?', (user_id,)).fetchone()
    if not user:
        conn.close()
        return jsonify({"error": "User not found"}), 404
    
    conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "User deleted successfully"})

@app.route('/api/questions', methods=['GET'])
def get_questions():
    user_id = request.args.get('user_id')
    
    conn = get_db_connection()
    
    if user_id:
        questions = conn.execute(
            '''SELECT q.*, s.name as subject_name 
               FROM questions q
               JOIN subjects s ON q.subject_id = s.id
               WHERE q.user_id = ?
               ORDER BY q.created_at DESC''', 
            (user_id,)).fetchall()
    else:
        questions = conn.execute(
            '''SELECT q.*, s.name as subject_name, u.username 
               FROM questions q
               JOIN subjects s ON q.subject_id = s.id
               JOIN users u ON q.user_id = u.id
               ORDER BY q.created_at DESC''').fetchall()
    
    conn.close()
    
    question_list = [dict(q) for q in questions]
    return jsonify(question_list)

@app.route('/api/questions', methods=['POST'])
def create_question():
    data = request.json
    title = data.get('title')
    content = data.get('content')
    user_id = data.get('user_id')
    subject_id = data.get('subject_id')
    
    if not all([title, content, user_id, subject_id]):
        return jsonify({"error": "Missing required fields"}), 400
    
    conn = get_db_connection()
    
    # Check if user and subject exist
    user = conn.execute('SELECT id FROM users WHERE id = ?', (user_id,)).fetchone()
    subject = conn.execute('SELECT id FROM subjects WHERE id = ?', (subject_id,)).fetchone()
    
    if not user:
        conn.close()
        return jsonify({"error": "User not found"}), 404
    
    if not subject:
        conn.close()
        return jsonify({"error": "Subject not found"}), 404
    
    cursor = conn.execute(
        '''INSERT INTO questions (title, content, user_id, subject_id, status)
           VALUES (?, ?, ?, ?, ?)''',
        (title, content, user_id, subject_id, 'pending')
    )
    question_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({
        "id": question_id,
        "message": "Question created successfully"
    })

@app.route('/api/subjects', methods=['GET'])
def get_subjects():
    conn = get_db_connection()
    subjects = conn.execute('SELECT * FROM subjects').fetchall()
    conn.close()
    
    subject_list = [dict(s) for s in subjects]
    return jsonify(subject_list)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
