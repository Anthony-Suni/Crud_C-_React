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




-- Insertar datos en la tabla 'users'
INSERT INTO users (gender, age, occupation, "zip-code") VALUES
  ('Male', 25, 'Engineer', '12345'),
  ('Female', 30, 'Teacher', '56789'),
  ('Male', 22, 'Student', '98765'),
  ('Female', 35, 'Doctor', '54321'),
  ('Male', 28, 'Programmer', '11111'),
  ('Female', 32, 'Lawyer', '22222'),
  ('Male', 40, 'Manager', '33333'),
  ('Female', 27, 'Artist', '44444'),
  ('Male', 45, 'Scientist', '55555'),
  ('Female', 29, 'Writer', '66666');

-- Insertar datos en la tabla 'ratings'
INSERT INTO ratings (userId, movieId, rating, timestamp) VALUES
  (1, 101, 5, '2024-01-09 12:00:00'),
  (2, 102, 4, '2024-01-09 13:30:00'),
  (3, 103, 3, '2024-01-09 15:45:00'),
  (4, 101, 2, '2024-01-09 14:15:00'),
  (5, 102, 4, '2024-01-09 16:30:00'),
  (6, 103, 5, '2024-01-09 18:00:00'),
  (7, 101, 3, '2024-01-09 19:45:00'),
  (8, 102, 4, '2024-01-09 20:30:00'),
  (9, 103, 5, '2024-01-09 22:00:00'),
  (10, 101, 4, '2024-01-09 23:30:00');

-- Insertar datos en la tabla 'movies'
INSERT INTO movies (movieId, title, genres) VALUES
  (101, 'Movie1', 'Action'),
  (102, 'Movie2', 'Drama'),
  (103, 'Movie3', 'Comedy'),
  (104, 'Movie4', 'Sci-Fi'),
  (105, 'Movie5', 'Thriller'),
  (106, 'Movie6', 'Romance'),
  (107, 'Movie7', 'Horror'),
  (108, 'Movie8', 'Adventure'),
  (109, 'Movie9', 'Fantasy'),
  (110, 'Movie10', 'Mystery');
