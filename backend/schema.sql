
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subjects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT
);

CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  subject_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (subject_id) REFERENCES subjects (id)
);

CREATE TABLE answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Insert initial subjects
INSERT INTO subjects (name, icon, description) VALUES
('Mathematics', '📐', 'Algebra, Calculus, Geometry, Statistics, and more'),
('Physics', '🔭', 'Mechanics, Thermodynamics, Electromagnetism, Quantum Physics'),
('Chemistry', '🧪', 'Organic, Inorganic, Physical Chemistry, Biochemistry'),
('Biology', '🧬', 'Cell Biology, Genetics, Ecology, Physiology'),
('Computer Science', '💻', 'Programming, Algorithms, Data Structures, Databases'),
('Literature', '📚', 'Fiction, Poetry, Drama, Literary Analysis'),
('History', '🏛️', 'World History, Ancient Civilizations, Modern Era'),
('Geography', '🌍', 'Physical Geography, Human Geography, Cartography'),
('Languages', '🗣️', 'Grammar, Vocabulary, Translation, Linguistics'),
('Economics', '📊', 'Microeconomics, Macroeconomics, International Trade');
