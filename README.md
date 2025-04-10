
# StudyHive - Multi-subject Tutoring Platform

A comprehensive tutoring and question answering platform for students to get help with homework and prepare for exams.

## Features

- User authentication (login, register, logout)
- Role-based dashboards (student and admin)
- Question submission and tracking
- Performance visualization with charts
- Administrator user management
- Multi-subject tutoring support

## Tech Stack

### Frontend
- React 18
- TypeScript
- TailwindCSS for styling
- Shadcn UI components
- Recharts for data visualization
- React Router for navigation
- React Query for data fetching

### Backend
- Flask (Python)
- SQLite database
- RESTful API endpoints

## Demo Accounts

For testing purposes, you can use these pre-configured accounts:

- **Student Account:**
  - Username: muser
  - Password: muser

- **Admin Account:**
  - Username: mvc
  - Password: mvc

## Running the Application

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

The frontend will be available at http://localhost:8080
The backend API will be available at http://localhost:5000

## Project Structure

- `/src` - React frontend code
  - `/components` - Reusable UI components
  - `/contexts` - React context providers
  - `/pages` - Main application pages
  - `/services` - API and data services

- `/backend` - Flask backend code
  - `app.py` - Main Flask application
  - `schema.sql` - Database schema
  - `requirements.txt` - Python dependencies

## API Endpoints

- `/api/login` - User authentication
- `/api/register` - New user registration
- `/api/users` - User management (admin only)
- `/api/questions` - Question submission and retrieval
- `/api/subjects` - Subject listing
