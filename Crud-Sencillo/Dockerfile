# Utiliza una imagen de Node.js como base
FROM node:14-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará la aplicación Vite
EXPOSE 5173

# Comando para ejecutar la aplicación en modo de desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
