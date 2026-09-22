# App Gestión SENCE

Aplicación backend desarrollada con **Node.js** y **Express** para la gestión de usuarios mediante una API REST conectada a una base de datos MySQL.

El proyecto incorpora operaciones CRUD sobre usuarios, validación de solicitudes, separación de responsabilidades mediante rutas, controladores y middlewares, y carga de archivos mediante `Multer`.

## Tecnologías utilizadas

- Node.js 18 o superior.
- Express.
- MySQL 8.
- MySQL2.
- Sequelize.
- Multer.
- Nodemon.
- dotenv.

## Requisitos

Antes de ejecutar el proyecto se requiere tener instalado:

- **Node.js 18 o superior.**
- **npm.**
- **MySQL 8 o un servidor MySQL compatible.**
- **Git.**

La versión de Node.js utilizada durante el desarrollo fue:

`Node.js 24.21.0`

## Instalación

Clonar el repositorio y acceder a la carpeta del proyecto:

```
HTTPS
git clone https://github.com/AlxDRF616/app-gestion-sence.git

SSH
git clone git@github.com:AlxDRF616/app-gestion-sence.git

cd app-gestion-sence
```

>La opción **SSH** requiere tener una clave SSH congifurada en Github.

Instalar las dependencias:

`npm install`

## Configuración

El proyecto utiliza variables de entorno para configurar la conexion con MySQL.

Crear un archivo `.env` en la raíz del proyecto a partir de `.env.example`:

`cp .env.example .env`

Configurar las variables correspondientes:

```
PORT=3000

DB_HOST=localhost
DB_PORT=3307
DB_NAME=app_gestion_sence
DB_USER=app_user
DB_PASSWORD=app123
```

Los valores de conexión deben ajustarse a la configuración de MySQL utilizada en cada entorno.

El archivo `.env` contiene información de configuración local y no debe ser incluido en el repositorio.

## Base de datos

La aplicación utiliza la base de datos:

`app_gestion_sence`

Las principales tablas utilizadas son:

- `usuarios`
- `historial_usuarios`

La aplicación requiere que el servidor MySQL se encuentre disponible antes de iniciar el backend.

Si se utiliza Docker, el contenedor de MySQL debe estar iniciado antes de ejecutar la aplicación.

## Ejecución

Para iniciar la aplicación normalmente:

`npm start`

Para ejecutar la aplicación durante el desarrollo utilizando Nodemon:

`npm run dev`

La aplicación queda disponible en:

`http://localhost:3000`

Al iniciar correctamente, el servidor verifica la conexión con MySQL y realiza una consulta de prueba sobre la tabla `usuarios`.

## API REST

La aplicación dispone de los siguientes endpoints principales:

| Método  | Endpoint       | Descripción                                  |
| ------- | -------------- | -------------------------------------------- |
| `GET`   | `/usuarios`    | Obtiene todos los usuarios.                  |
| `GET`   | `/usuarios/:id`| Obtiene un usuario específico.               |
| `POST`  | `/usuarios`    | Crea un nuevo usuario.                       |
| `PUT`   | `/usuarios/:id`| Actualiza los datos permitidos de un usuario.|
| `DELETE`| `/usuarios/:id`| Elimina un usuario.                          |

## Crear un usuario

Enviar una solicitud `POST` a:

`/usuarios`

con un cuerpo JSON:

```
JSON

{
    "nombre": "Juan Perez",
    "email": "juan@example.com",
    "password": "123456"
}
```

Los campos `nombre`, `email` y `password` son obligatorios.

## Actualizar usuario

Enviar iuna solicitud `PUT` a:

`/usuarios/:id`

Por ejemplo:

`/usuarios/4`

Se pueden modificar los campos:

```
JSON

{
    "nombre": "Juan Actualizado",
    "email": "juand.actualizado@example.com"
}
```

## Eliminar usuario

Enviar una solicitud `DELETE` a:

`/usuarios/:id`

Por ejemplo:

`/usuarios/4`

La API verifica previamente que el usuario exista.

## Carga de archivos

La aplicación permite subir archivos mediante:

`POST /upload`

La solicitud debe utilizar `multipart/form-data` y enviar un único archivo mediante el campo:

`archivo`

Actualmente se permiten archivos de tipo:

- JPG
- JPEG
- PNG
- GIF

Los archivos se almacenan en:

`public/uploads/`

Los archivos almacenados pueden ser consultados mediante:

`http://localhost:3000/uploads/nombre-del-archivo`

## Autenticación mediante JWT

La aplicación utiliza JSON Web Tokens (JWT) para proteger determinados endpoints de la API.

La clave utilizada para firmar y verificar los tokens se configura mediante la variable de entorno:

`JWT_SECRET=tu_clave_secreta`

Esta variable debe configurarse en el archivo `.env`. El archivo `.env.example` contiene una refencia para facilitar la configuración del proyecto.

### Iniciar sesión

Para obtener un token JWT se debe realizar una solicitud `POST` a:

`/login`

La solicitud debe enviar las credenciales del usuario en formato JSON:

```
JSON

{
    "email": "correo@example.com",
    "password": "contraseña_simulada"
}
```

Si las credenciales son correctas, la API responde con un token:

```
JSON

{
    "mensaje": "Autenticación exitosa.",
    "token": "..."
}
```

El token tiene una vigencia de una hora.

### Uso del token

Las rutas protegidas requieren enviar el JWT mediante el encabezado HTTP:

`Authorization: Bearer <token>`

Por ejemplo:

```
Bash

curl -i http://localhost:3000/usuarios \
-H "Authorization: Bearer PEGA_AQUÍ_EL_TOKEN"

```

### Rutas protegidas

Actualmente requieren autenticación mediante JWT:

- `GET /usuarios`
- `DELETE /usuarios/:id`

Si se intenta acceder a estas rutas sin un token, la API responde con HTTP `401` y un mensaje indicando que se requiere autenticación.

Si el token es inválido o está expirado, la API también responde con HTTP `401`.

### Ejemplo de flujo de autenticación

El uso de las rutas protegidas sigue el siguiente flujo:

1. El cliente envía sus credenciales mediante `POST /login`.
2. La API verifica las credenciales.
3. Si son correctar, genera y devuelve un JWT.
4. El cliente envía el JWT en el encabezado `Authorization` al utilizar una ruta protegida.
5. El servidor verifica la validez y vigencia del token.
6. Si el token es válido, se permite continuar con la operación.
7. Si el token falta, es inválido o está expirando, la solicitud es rechazada con HTTP `401`.

## Manejo de errores

La API utiliza códigos de estado HTTP para informar el resultado de las operaciones.

ENtre las respuestas utilizadas se encuentran:

- `201` - Recurso creado correctamente.
- `200` - Operación realizada correctamente.
- `400` - Solicitud inválida o datos obligatorios ausentes.
- `404` - Recurso no encontrado.
- `500` - Error interno durante una operación del servidor.

Los mensajes de error enviados al cliente no exponen detalles internos de la base de datos.

## Estructura del proyecto

```
app-gestion-sence/      
├── controllers/        ─ Lógica de las operaciones de la API
├── docs/               ─ Evidencias de las pruebas
├── logs/               ─ Registros generados por la aplicación
├── middlewares/        ─ Validaciones y configuración de middleware
├── public/             ─ Contenido estático y archivos subidos
|       └── uploads/
├── routes/             ─ Definición de las rutas de la API
├── config/             ─ Configuración de conexiones
├── models/             ─ Modelos utilizados por Sequelize
├── .env                ─ Configuración local (No se versiona)
├── .env.example        ─ Ejemplo de variables de entorno
├── .gitignore
├── DOCUMENTACION.md    ─ Documentación del desarrollo de las lecciones
├── index.js            ─ Punto de entrada de la aplicación
├── package.json
├── package-lock.json
└── README.md           ─ Manual del proyecto
```

## Estado del proyecto

La aplicación cuenta actualmente con:

- API REST para gestión de usuarios.
- Operaciones de creación, consulta, modificación y eliminacion.
- Validación de datos mediante middlewares.
- Conexión con MySQL.
- Separación de rutas, controladores y middlewares.
- Carga de archivos mediante Multer.
- Almacenamiento de archivos en `public/uploads/`.