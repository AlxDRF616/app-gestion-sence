# Evaluación - App Gestión de usuarios y datos

### Evidencias del proyecto

Las evidencias y reflexiones tal y como fueron solicitadas se encuentran organizadas en Google Drive.

[¡Click aquí para ingresar a la carpeta compartida!](https://drive.google.com/drive/folders/1WkUt979tqvtwyH30au0nBobpMg18Nie6?usp=sharing)

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


### Lección 2: Obtención de información desde una base de datos

En esta lección se implementó una ruta **`GET /usuarios`** que permite consultar los registros almacenados en la tabla `usuarios` de la base de datos MySQL y devolverlos mediante una respuesta JSON.

Para realizar la consulta se reutilizó el pool de conexiones configurado en:

`config/database.js`

La ruta se encuentra en:

`routes/usuarios.js`

#### Datos de prueba

Se agregaron tres registros simulados a la tabla `usuarios` para comprobar el funcionamiento de la consulta:

- Juan Perez
- Maria Gonzalez
- Pedro Soto

Los registros fueron verificados directamente en MySQL.

#### Consulta de usuarios

La ruta utiliza una consulta SQL que solicita únicamente los campos necesarios:

`SELECT id, nombre, email, fecha_creacion FROM usuarios;`

No se incluye el campo `password` en la consulta.

Posteriormente, los resultados obtenidos desde MySQL son procesados mediante `map()` para construir nuevos objetos con los campos que serán enviados al cliente.

De esta forma, la respuesta queda limitada a:

- `id`
- `nombre`
- `email` 
- `fecha_creacion`

Esto evita exponer contraseñas u otros datos que no deberían formar parte de la respuesta pública de la API.

#### Manejo de errores

La consulta incluye un manejo de errores mediante una condición `if (error)...`.

Si ocurre un problema al realizar la consulta, el servidor registra el error en la consola y devuelve una respuesta HTTP `500` con un mensaje general:

```
{
    "error": "No fue posible obtener los usuarios."
}
```

De esta manera, el cliente no recibe información interna sobre el error de la base de datos.

#### Resultado

La ruta fue probada mediante:

`GET http://localhost:3000/usuarios`

La respuesta fue entregada correctamente en formato JSON y contiene los tres registros almacenados en MySQL, sin incluir el campo `password`.

#### Evidencias

- Registros almacenados en MySQL

![captura-insercion-datos-sql](/docs/captura-insercion-datos-sql-L2-M7.png)

- Registro de la ruta GET`/usuarios`

![captura-ruta-usuarios](/docs/captura-ruta-usuarios-L2-M7.png)

---

### Lección 3: Modificación de datos en una base de datos

En esta lección se incorporaron operaciones de modificación y eliminación sobre los registros existentes de la tabla `usuarios`.

Se implementaron las siguientes rutas:

- `PUT /usuarios/:id`: Permite modificar determinados datos de un usuario.
- `DELETE /usuarios/:id`: Permite eliminar un usuario existente.

Las rutas se encuentran en:

`routes/usuarios.js`

#### Modificación de usuarios

La ruta `PUT /usuarios/:id` permite modificar únicamente los campos `nombre` y `email`.

Se decidió limitar la actualización a estos campos porque corresponden a datos del perfil del usuario que pueden cambiar durante la utilización de la aplicación.

No se permite modificar:

- `id`: Identifica de forma única al usuario y funciona como clave primaria.
- `fecha_creacion`: Representa el momento en el que se creó el registro y no debería cambiar durante una actualización.
- `password`: No se modifica mediante esta ruta, ya que posteriormente debería existir un flujo específico para el cambio de contraseña.

La ruta construye la consulta `UPDATE` únicamente con los campos que fueron enviados en la solicitud.

#### Validaciones aplicadas

Antes de realizar la actualización se verifica que se haya proporcionado al menos uno de los campos permitidos:

- `nombre`
- `email`

Si no se proporciona ninguno, la API devuelve una respuesta HTTP `400`.

También se verifica previamente que el ID recibido corresponda a un usuario existente.

Si el usuario no existe, la API devuelve una respuesta HTTP `404` con el mensaje:

```
{
    "error": "Usuario no encontrado."
}
```

Los errores producidos durante las consultas a MySQL se controlan mediante una respuesta HTTP `500`, evitando exponer detalles internos de la base de datos al cliente.

#### Eliminación de usuarios

La ruta `DELETE /usuarios/:id` permite eliminar un usuario mediante su identificador.

Antes de ejecutar la eliminación se realiza una consulta para verificar que el usuario exista.

Si el ID no corresponde a ningún registro, la operación se detiene y se devuelve una respuesta HTTP `404`.

Si el usuario existe, se ejecuta la consulta:

`DELETE FROM usuarios WHERE id = ?`

En caso de que la operación se complete correctamente, la API devuelve:

```
{
    "mensaje": "Usuario eliminado correctamente."
}
```

#### Resultados de las pruebas

Se realizaron pruebas tanto con IDs existentes como con IDs inexistentes.

Para la modificación:

- `PUT /usuarios/4`: Actualización realizada correctamente.
- `PUT /usuarios/999`: Se devolvió `Usuario no encontrado.`

Para la eliminación:

- `DELETE /usuarios/6`: Eliminación realizada correctamente durante pruebas funcionales.
- `DELETE /usuarios/5`: Eliminación realizada correctamente como prueba para generar evidencia.
- `DELETE /usuarios/999`: Se devolvió `Usuario no encontrado.`

Además, los cambios fueron comprobados directamente en MySQL. El usuario con `id = 4` quedó actualizado y los usuarios utilizados en las pruebas de eliminación fueron eliminados correctamente.

#### Evidencias

- Actualización exitosa mediante `PUT /usuarios/:id`

![captura-put-usuario](/docs/captura-put-usuario-L3-M7.png)

- Eliminación exitosa mediante `DELETE /usuarios/:id`

![captura-delete-usuario](/docs/captura-delete-usuario-L3-M7.png)

- Validación de ID inexistente en las operaciones `PUT` y `DELETE`

![captura-validacion-id](/docs/captura-validacion-id-L3-M7.png)

---
