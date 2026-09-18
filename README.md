# Evaluación - App Gestión de usuarios y datos

### Evidencias del proyecto

Las evidencias y reflexiones tal y como fueron solicitadas se encuentran organizadas en Google Drive.
[Google Drive](https://drive.google.com/drive/folders/1WkUt979tqvtwyH30au0nBobpMg18Nie6?usp=sharing)

## Módulo 6
### Lección 1:
#### Node.js
>Node.js es un entorno que permite ejecutar JS(JavaScript) fuera del navegador. 
Se utiliza principalmente para desarrollar aplicaciones y servicios del lado del servidor.

>Su ecosistema incluye **npm**, que permite administrar paquetes y dependencias del proyecto.
#### Express.js
>Express es un framework para Node.js que facilita la creación y organización de servidores web y APIs.

>Aporta herramientas para trabajar con:

>- Rutas.
>- Solicitudes y respuestas HTTP.
>- Middleware.
>- Manejo de errores.

>En este proyecto utilizaremos **Node.js como entorno de ejecución y Express.js para desarrollar el backend y la API.**

#### Flujo cliente-Servidor
>El cliente realiza una solicitud HTTP -> Express la recibe y procesa -> el backend ejecuta la lógica necesaria ->
 Se genera una respuesta -> El cliente recibe y muestra el resultado.
 
 ![diagrama-flujo-servidor-a-cliente](/docs/diagrama-flujo-servidor-cliente.png)
---

### Lección 2: Instalación y configuración de Node
El proyecto fue configurado usando Node.js v24.21.0 y npm v12.0.2. Se utilizó `npm init`para crear el archivo `package.json`
y se añadio `index.js` como punto de partida de la aplicación.

Se estableció `index.js`porque permite identificar claramente el punto desde donde se inicia la aplicación.

También se incorporó `dotenv` para gestionar variables de entorno mediante el archivo `.env` el cuál actualmente
está utilizando la variable `PORT` para definir el puerto de la aplicación.

![captura-código-index-lección2](/docs/captura-codigo-index-L2.png)

Todo esto fue validado ejecutando el archivo.

![captura-resultado-ejecución-index-leccion2](/docs/captura-resultado-ejecucion-index-L2.png)

Los archivos utilizados en el desarrollo como `.env` y la carpeta `node_modules` fueron excluidos del control de versiones
mediante `.gitignore`.

---
### Lección 3: Gestión de paquetes en Node
Se añadieron los paquetes necesarios para continuar con el desarrollo del backend:
- **Express:** framework para construir el servidor y las rutas de la aplicación.
- **dotenv:** permite cargar variables de entorno desde el archivo `.env`.
- **Nodemon:** herramienta utilizada durante el desarrollo para reiniciar automáticamente la aplicación cuando se detectan cambios.

>Express y dotenv se declararon como dependencias del proyecto, mientras que Nodemon se configuró como dependencia de desarrollo.

#### Instalación
Despues de clonar el repositorio, las dependencias pueden instalarse ejecutando:

`npm install`

#### Ejecución
Para ejecutar la aplicación normalmente:
`npm start`

Para ejecutar la aplicación durante el desarrollo utilizando Nodemon:
`npm run dev`

#### Scripts
Se definieron dos scripts personalizados en `package.json`:
- `npm start`: Ejecuta la aplicación mediante Node.js y está destinado a la ejecución normal del proyecto.
- `npm run dev`: Ejecuta la aplicación mediante Nodemon, permitiendo reinicios automáticos durante el desarrollo.

>Se mantuvieron estos nombres por ser convenciones haituales de proyectos **Node.js** y por diferenciar claramente la ejecución
normal de la ejecución orientada al desarrollo.

>Cabe destacar que ambos scripts fueron probados correctamente mediante la terminal.

---

### Lección 4: Sirviendo contenido Web
Se configuró **Express** para servir contenido web mediante rutas públicas y archivos estáticos.

#### Rutas públicas 
La aplicación cuenta con las siguientes rutas:
- `GET /`: Entrega una respuesta HTML generada directamente por Express.
- `GET /status`: Entrega información sobre el estado del servidor en formato JSON.

#### Contenido estático
Se creó la carpeta `public/` para almacenar archivos estáticos. Express utiliza el middleware `express.static()` para servir estos archivos.

La configuración utilizada es:

`app.use(express.static("public", { index: false}));`

>Se deshabilitó el uso automático de `index.html` como página índice para que la ruta `/` sea gestionada explícitamente por **Express**.

El archivo `public/index.html` puede accederse directamente mediante:

`http://localhost:3000/index.html`

>De esta manera, la aplicación demuestra tanto el uso de rutas gestionadas por **Express** como el servicio de contenido estático.

#### Evidencias
- Ruta principal `/`
![captura-ruta-principal](/docs/captura-ruta-principal-L4.png)

- Ruta `/status`
![captura-ruta-status](/docs/captura-ruta-status-L4.png)

- Contenido estático `/index.html`
![captura-ruta-contenido-estatico](/docs/captura-ruta-contenido-estatico-L4.png)

---

### Lección 5: Persistencia en archivos planos
Se implementó un sistema simple de registro utilizando el módulo `fs` de **Node.js**.

Cada vez que se accede a la ruta `/status`, se registra una línea en `log.txt` utilizando `fs.appendFile()`.

Cada registro contiene:
- Fecha.
- Hora.
- Ruta accedida.

Ejemplo:
```
fecha | hora | ruta
18-09-2026 | 01:03:45 a. m. | /status
```

>Se eligió registrar las visitas a `/status` porque permite demostrar de forma sencilla la persistencia de eventos generados
por las solicitudes HTTP. El archivo conserva los registros anteriores y agrega cada nueva visita al final mediante `fs.appendFile()`.

#### Evidencia
El archivo `log.txt` contiene al menos tres accesos registrados a la ruta `/status`.

![captura-resultado-logs](/docs/captura-log-L5.png)

---

### Lección 6: Ejecución de un aplicativo Node
Se validó la ejecución de la aplicación **Node.js** mediante `npm run dev` y se comprobó el funcionamiento
de las rutas creadas durante las lecciones anteriores.

#### Requisitos del sistema

Para ejecutar el proyecto se requiere:

- Node.js 18 o superior.
- npm.
- Git.

La versión utilizada durante el desarrollo fue Node.js 24.21.0.

#### Instalación

Después de clonar o descargar el repositorio, instalar las dependencias mediante:
`npm install`

Luego se debe crear un archivo `.env` a partir de `.env.example` y configurar el puerto de ejecución:
`PORT=3000`

#### Ejecución

Para iniciar la aplicación normalmente:
`npm start`

Para ejecutar la aplicación durante el desarrollo utilizando Nodemon:
`npm run dev`

#### Ejemplos de uso

Con el servidor ejecutándose en el puerto 3000, se pueden consultar las siguientes rutas por el momento:
- `GET /`: Muestra la página principal generada por **Express**.
- `GET /status`: Devuelve información sobre el estado del servidor en formato **JSON**.
- `GET /index.html`: Muestra el contenido estático ubicado en la carpeta `public/`.

#### Estructura del proyecto

El proyecto utiliza una estructura modular que permite separar las distintas responsabilidades de la aplicación:
```
|- controllers/  -> Controladores de la aplicación
|- docs/         -> Evidencias y documentacion del proyecto
|- logs/         -> Archivo de registro
|- middlewares/  -> Middlewares de Express
|- public/       -> Contenido estático
|- routes/       -> Rutas de la aplicación
|- .env          -> Variables de entorno local
|- .env.example  -> Ejemplo de configuración de variables
|- .gitignore    -> Archivos excluidos de Git
|- index.js      -> Punto de entrada de la aplicación
|- package.json  -> Configuración y dependencias
|- package-lock.json
|- README.md     -> Documentación del proyecto
```

Las carpetas `routes`, `controllers` y `middlewares` se incorporan desde esta etapa para mantener una estructura preparada para la modularización de la aplicación en las siguientes etapas del proyecto.

La carpeta `logs` contiene el archivo utilizado para la persistencia de los registros de acceso generados por la aplicación.

#### Estado de la validación

Se comprobó que:
- La aplicación inicia correctamente mediante `npm run dev`.
- Las rutas `/`, `/status` e `/index.html` responden correctamente.
- El archivo `logs/log.txt` registra los accesos realizados.
- La estructura del proyecto se encuentra organizada de acuerdo con los requisitos de la actividad.

---

## Módulo 7
### Lección 1: Conexión a base de datos

En esta lección se configuró la conexion entre el servidor **Node.js** y una base de datos relacional **MySQL**, utilizando el paquete `mysql2`.

Para el proyecto se creó una base de datos llamada `app_gestion_sence` y una tabla principal llamada `usuarios`.

#### Base de datos

La base de datos utilizada es:
`app_gestion_sence`, la cual posee una tabla principal denominada `usuarios`, la cual posee los siguientes campos:
- `id`: Identificador único y clave primaria.
- `nombre`: Nombre del usuario.
- `email`: Correo electrónico, configurado como único.
- `password`: Campo destinado al almacenamiento de la contraseña protegida.
- `fecha_creacion`: Fecha y hora de creación del registro.

#### Cliente de conexión

Se utilizó el paquete `mysql2` para establecer la conexión entre **Node.js** y **MySQL**.

>Se eligió **mysql2** porque permite conectar directamente la aplicación Node.js con MySQL y ejecutar consultas SQL desde el backend.
Además, permite trabajar posteriormente con consultas parametrizadas y pools de conexion, facilitano el desarrollo de una aplicación que
pueda manejar múltiples solicitudes.

La conexión se encuentra separada en el archivo:

`config/database.js`

En este archivo se utiliza un pool de conexiones para administrar la comunicación entre la aplicación y la base de datos.

#### Variables de entorno

Las credenciales y datos de conexión no se escriben directamente en el código fuente. Se almacenan mediante variables de entrorno en el archivo `.env`.

```
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
```

El archivo `.env` se encuentra incluido en `.gitignore`, por lo que sus valores no forman parte del repositorio público.

El archivo `.env.example` permite documentar las variables necesarias sin exponer sus valores reales.

#### Protección de datos sensibles

Los datos sensibles se protegen evitando incluir credenciales directamente en los archivos JavaScript o en el repositorio.

El proyecto utiliza `dotenv` para cargar las variables de entorno durante la ejecución y `.gitignore` para impedir que el archivo `.env` sea incluido en el control de versiones.

De esta forma, las credenciales utislizadas para acceder a la base de datos permanecen separadas del código fuente.

#### Validación de la conexión

Se ejecutó la aplicación mediante:

`npm run dev`

La conexión con MySQL fue establecida correctamente y posteriormente se realizó una consulta de prueba sobre la tabla `usuarios`.

Como la tabla todavia no contiene registros, la consulta devolvió:

`Registros encontrados: 0`

Este resultado confirma que **Node.js** pudo conectarse correctamente a la base de datos y consultar la tabla.

#### Evidencia

![captura-enlace-sql-L1-M7.png](/docs/captura-enlace-sql-L1-M7.png)

---


