Movies Explorer — Backend

API REST para Movies Explorer, la aplicación que permite a los usuarios registrarse, iniciar sesión, buscar películas a través de la API de TMDB y guardar sus favoritas en su cuenta personal.

Este repositorio corresponde exclusivamente al backend del proyecto. El frontend se encuentra en un repositorio separado: project-final-frontend.

🌐 Dominio

⏳ Pendiente — se agregará una vez completado el despliegue en producción.

🛠️ Tecnologías utilizadas
Node.js + Express — servidor y enrutamiento
MongoDB + Mongoose — base de datos y modelado de esquemas
JSON Web Token (jsonwebtoken) — autenticación basada en tokens
bcryptjs — hasheo de contraseñas
celebrate / Joi — validación de datos en las peticiones
validator — validación de formatos (email, URL)
winston / express-winston — registro (logging) de solicitudes y errores
cors — manejo de peticiones cross-origin
dotenv — gestión de variables de entorno
ESLint (airbnb-base) — linting y buenas prácticas de código
📁 Estructura del proyecto
project-final-backend/
├── controllers/ # Lógica de cada recurso
├── errors/ # Clases de error personalizadas (400, 401, 403, 404, 409)
├── middlewares/ # auth, errorHandler, logger, validators
├── models/ # Esquemas de Mongoose (user, movie)
├── routes/ # Definición de endpoints
├── app.js # Punto de entrada de la aplicación
└── package.json
🔑 Autenticación

La API utiliza JSON Web Tokens. Tras iniciar sesión, el token debe enviarse en cada petición protegida dentro del header:

Authorization: Bearer <token>
📌 Endpoints
Públicos (no requieren autenticación)
Método Ruta Descripción
POST /signup Registra un nuevo usuario (name, email, password)
POST /signin Inicia sesión y devuelve un JWT
Protegidos (requieren token JWT)
Método Ruta Descripción
GET /users/me Devuelve la información del usuario autenticado
GET /movies Devuelve las películas guardadas por el usuario
POST /movies Guarda una nueva película para el usuario autenticado
DELETE /movies/:movieId Elimina una película guardada (solo si pertenece al usuario)
⚙️ Variables de entorno

Crea un archivo .env en la raíz del proyecto (no se sube al repositorio) con las siguientes variables:

NODE_ENV=production
JWT_SECRET=<tu_clave_secreta>

En modo desarrollo, la aplicación funciona correctamente aunque este archivo no exista, utilizando valores por defecto.

🚀 Instalación y uso local
bash

# Clonar el repositorio

git clone https://github.com/Ericksj91/project-final-backend.git
cd project-final-backend

# Instalar dependencias

npm install

# Modo desarrollo (con recarga automática)

npm run dev

# Modo producción

npm start

El servidor corre por defecto en el puerto 3000.

📝 Registro de actividad (logging)

Todas las solicitudes y errores quedan registrados en formato JSON:

request.log — registro de todas las peticiones a la API
error.log — registro de los errores devueltos por la API
👤 Autor

Erick Jiménez
