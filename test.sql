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
    id SERIAL PRIMARY KEY,
    pelicula VARCHAR(255) NOT NULL,
    genero VARCHAR(255),
    ratings INT[] -- Un array para almacenar múltiples ratings
);

-- Puedes agregar más comandos SQL según sea necesario para tu aplicación.
