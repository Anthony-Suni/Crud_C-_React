-- Crear la base de datos
CREATE DATABASE movierecommendation;

-- Conectarse a la base de datos Recomendaciones
\c movierecommendation;

-- Crear la tabla users
CREATE TABLE users
(
   userid SERIAL PRIMARY KEY,
   gender VARCHAR(255),
   age INT,
   occupation VARCHAR(255),
   "zip-code" VARCHAR(255)
);


-- Crear la tabla 'ratings'
CREATE TABLE ratings
(
   userId INT,
   movieId INT,
   rating INT,
   timestamp TIMESTAMP,
   PRIMARY KEY (userId, movieId)
);



-- Crear la tabla 'movies'
CREATE TABLE movies
(
   movieId INT PRIMARY KEY,
   title VARCHAR(255),
   genres VARCHAR(255)
);



-- Puedes agregar más comandos SQL según sea necesario para tu aplicación.
