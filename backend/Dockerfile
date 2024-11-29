# Usa una imagen base de Node.js
FROM node:18

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del backend al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto que usará tu backend
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
