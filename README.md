# Stock API

Backend API para gestión de inventario desarrollado con Node.js, Express y MongoDB.

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose

## Features

- CRUD de productos
- Validación de datos
- Manejo de errores
- Arquitectura modular (routes / controllers / middlewares)
- Variables de entorno

## Estructura del proyecto

controllers/
middlewares/
models/
routes/

## Instalación

Clonar el repositorio:

git clone https://github.com/tuusuario/stock-api

Instalar dependencias:

npm install

Crear archivo `.env`

PORT=3000  
MONGO_URI=mongodb://127.0.0.1:27017/stock-api

Iniciar el servidor:

npm run dev

## Endpoints

GET /products  
GET /products/:id  
POST /products  
PUT /products/:id  
DELETE /products/:id


Bibliografía

Day 1:
- https://expressjs.com/en/starter/hello-world.html?utm_source=chatgpt.com

Day 2:
- https://expressjs.com/en/guide/routing.html?utm_source=chatgpt.com

Day 3:
- https://mongoosejs.com/docs/?utm_source=chatgpt.com

Day 4:
- https://expressjs.com/en/guide/using-middleware.html?utm_source=chatgpt.com

Day 5:
- https://expressjs.com/es/guide/using-middleware.html