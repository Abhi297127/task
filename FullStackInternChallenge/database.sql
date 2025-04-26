-- Create database (run this in PostgreSQL client)
CREATE DATABASE store_ratings;

-- Connect to the database
\c store_ratings

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL CHECK (LENGTH(name) >= 20 AND LENGTH(name) <= 60),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(400) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user', 'store_owner'))
);

-- Stores table
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(400) NOT NULL,
    owner_id INTEGER REFERENCES users(id)
);

-- Ratings table
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    store_id INTEGER REFERENCES stores(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    UNIQUE (user_id, store_id) -- Ensures a user can rate a store only once
);

-- Insert an initial admin user for testing
INSERT INTO users (name, email, password, address, role) 
VALUES (
    'Administrator Full Name Here Long', 
    'admin@example.com', 
    '$2a$10$wPzN30ESulEX95m83a6Xt.4sAIYk8Flp0vB0qtdDoZ0tPUV6Kh8Tu', -- Replace with bcrypt hashed password
    '123 Admin Street, Admin City, Country', 
    'admin'
);