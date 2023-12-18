-- Crear la base de datos
CREATE DATABASE movierecommendation;

-- Conectarse a la base de datos Recomendaciones
\c movierecommendation;

-- Crear la tabla users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    genero VARCHAR(255),
    pelicula VARCHAR(255), 
    rating INT 
);

-- Crear la tabla movies
CREATE TABLE movies (
    movieId SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genres VARCHAR(255),
);

-- Puedes agregar más comandos SQL según sea necesario para tu aplicación.
