-- Crear la base de datos
CREATE DATABASE recomendaciones;

-- Conectarse a la base de datos Recomendaciones
\c Recomendaciones;

-- Crear la tabla users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    genero VARCHAR(255), -- Asegúrate de que coincida con el nombre de la propiedad en tu modelo
    pelicula VARCHAR(255), -- Asegúrate de que coincida con el nombre de la propiedad en tu modelo
    rating INT -- Asegúrate de que coincida con el nombre de la propiedad en tu modelo
);


-- Puedes agregar más comandos SQL según sea necesario para tu aplicación.
