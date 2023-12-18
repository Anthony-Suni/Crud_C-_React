-- Crear la base de datos
CREATE DATABASE movierecommendation;

-- Conectarse a la base de datos Recomendaciones
\c movierecommendation;

-- Crear la tabla users
CREATE TABLE users (
    userId INT PRIMARY KEY,
    gender VARCHAR(255),
    age INT,
    occupation INT NULL,
    zip_code VARCHAR(255) NULL
);

-- Crear la tabla 'ratings'
CREATE TABLE movies (
    movieId INT PRIMARY KEY,
    title VARCHAR(255),
    genres VARCHAR(255)
);


-- Crear la tabla 'movies'
CREATE TABLE movies (
    movieId INT PRIMARY KEY,
    title VARCHAR(255),
    genres VARCHAR(255) NULL
);

-- Puedes agregar más comandos SQL según sea necesario para tu aplicación.
