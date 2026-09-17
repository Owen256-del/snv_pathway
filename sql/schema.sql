CREATE TABLE fields (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Student',
    field_id INT REFERENCES fields(id),
    career_goal VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE careers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    field_id INT REFERENCES fields(id)
);

ALTER TABLE users
ADD COLUMN career_id INT REFERENCES careers(id);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100)
);

CREATE TABLE career_skills (
    career_id INTEGER REFERENCES careers(id) ON DELETE CASCADE,
    skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
    importance VARCHAR(20) DEFAULT 'required',
    PRIMARY KEY (career_id, skill_id)
);

CREATE TABLE student_skills (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
    level VARCHAR(30) DEFAULT 'beginner',
    PRIMARY KEY (user_id, skill_id)
);

CREATE TABLE opportunities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    organization VARCHAR(150),
    description TEXT,
    type VARCHAR(50),
    location VARCHAR(100),
    country VARCHAR(100),
    deadline DATE,
    url TEXT,
    career_id INT REFERENCES careers(id)
);

CREATE TABLE alumni (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    field_id INT REFERENCES fields(id),
    graduation_year INTEGER,
    current_role VARCHAR(50),
    organization VARCHAR(150),
    country VARCHAR(100),
    bio TEXT,
    linkedin TEXT
);

CREATE TABLE alumni_careers (
    alumni_id INTEGER REFERENCES alumni(id) ON DELETE CASCADE,
    career_id INT REFERENCES careers(id) ON DELETE CASCADE,
    PRIMARY KEY (alumni_id, career_id)
);

CREATE TABLE mentorship_requests (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id) ON DELETE CASCADE,
    alumni_id INT REFERENCES alumni(id) ON DELETE CASCADE,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);