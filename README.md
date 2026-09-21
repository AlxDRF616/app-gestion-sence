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

### Lección 4: Transaccionalidad

En esta lección se implementó una operación transaccional que permite registrar un usuario y crear su historial como parte de una misma transacción en MySQL.

La operación se encuentra en:

`routes/usuarios.js`

La ruta implementada es:

`POST /usuarios/transaccion`

#### Operaciones realizadas

La transacción realiza dos acciones consecutivas:

1. Inserta un nuevo usuario en la tabla `usuarios`.
2. Crea un registro asociado en la tabla `historial_usuarios`.

Ambas operaciones utilizan la misma conexión de MySQL y forman parte de una única transacción.

La secuencia implementada es:

`BEGIN -> Crear usuario -> Crear historial -> COMMIT`

Si alguna de las operaciones falla, se ejecuta `ROLLBACK`:

`BEGIN -> Crear usuario -> Error al crear historial -> ROLLBACK`

De esta manera se evita que una de las operaciones quede almacenada cuando la otra no pudo completarse correctamente.

#### Tabla de historial

Para registrar la segunda operación se creó la tabla `historial_usuarios`, relacionada con `usuarios` mediante una clave foránea.

La tabla contiene:

- `id`: Identificador del registro.
- `usuario_id`: Usuario asociado al historial.
- `accion`: Descripción de la acción realizada.
- `fecha`: Fecha y hora del registro.

La relación mediante clave foránea permite mantener la integridad entre ambas tablas.

#### Confirmación de la transacción

Cuando las dos operaciones se ejecutan correctamente, se utiliza `COMMIT` para confirmar los cambios.

Se realizó una prueba utilizando el usuario `Ana Torres`.

La API respondió:

```
{
    "mensaje": "Usuario e historial creados correctamente."
}
```

Posteriormente se comprobó directamente en MySQL que el usuario y su registro de historial habían sido almacenados correctamente.

#### Rollback ante un error

Para comprobar el funcionamiento del `ROLLBACK`, se implementó un mecanismo de prueba mediante el campo `forzarError`.

Cuando este campo tiene el valor `true`, se provoca intencionalmente un error durante la creación del historial.

La API respondió:

```
{
    "error": "La segunda operación falló. La transacción fue revertida."
}
```

Posteriormente se consultó MySQL buscando el usuario utilizado para la prueba.

`rollback@example.com`

El resultado fue `Empty set`, demostrando que el usuario tampoco quedó almacenado.

Esto confirma que el `ROLLBACK` revirtió la primera operación después de que la segunda fallara.

#### Logs de la transacción

Durante la ejecución se registran mensaje en la consola para indicar el estado de la operación, incluyendo:

- Inicio de la trnsacción.
- Creación del usuario.
- Creación del historial.
- Confirmación mediante `COMMIT`.
- Errores y reversión mediante `ROLLBACK`.

#### Evidencias

- Transacción exitosa y confirmación mediante `COMMIT`

![captura-transaccion-exitosa](/docs/captura-transaccion-exitosa-L4-M7.png)

- Error forzado y comprobación del `ROLLBACK`

![captura-rollback-1](/docs/captura-rollback-L4-M7-1.png)

![captura-rollback-2](/docs/captura-rollback-L4-M7-2.png)

---

### Lección 5: Acceso a datos con ORM

En esta lección se incorporó **Sequelize** como ORM para complementar las consultas SQL manuales utilizadas en las lecciones anteriores.

El objetivo fue consultar la tabla `usuarios` utilizando un modelo de JavaScript y comparar el resultado obtenido mediante ORM con la consulta SQL tradicional.

#### Instalación de Sequelize

Sequelize fue instalado mediante:

`npm install sequelize`

>El proyecto ya contaba con `mysql2`, utilizado como controlador para la conexión con MySQL.

#### Configuración de Sequelize

Se creó el archivo:

`config/sequelize.js`

Este archivo configura la conexión de Sequelize utilizando las variables de entorno definidas en `.env`.

Se mantuvo la misma configuración de base de datos utilizada por la aplicación:

- Host.
- Puerto.
- Nombre de la base de datos.
- Usuario.
- Contraseña.

La conexión fue comprobada mediante `sequelize.authenticate()` y se confirmó correctamente la comunicación entre Node.js, Sequelize y MySQL.

#### Modelo User

Se creó el modelo:

`models/User.js`

El modelo `User` representa la tabla existente:

`usuarios`

Se definieron los campos:

- `id`
- `nombre`
- `email`
- `password`
- `fecha_creacion`

Se configuró `tableName: "usuarios"` para utilizar la tabla existente y `timestamps: false` para evitar que Sequelize agregue automáticamente los campos `createdAt` y `updatedAt`.

#### Consulta mediante ORM

Se creó la ruta:

`GET /usuarios/orm`

Esta ruta utiliza el método `User.findAll()` de Sequelize para obtener los registros de la tabla `usuarios`.

Para mantener la comparación equivalente con la consulta SQL manual, se solicitaron únicamente los campos:

```
id
nombre
email
fecha_creacion
```

La consulta ORM utilizada conceptualmente es:

```
JS

User.findAll({
    attributes: ["id", "nombre", "email", "fecha_creacion"]
});
```

#### Comparación entre SQL manual y ORM

La aplicación ya contaba ccon la ruta:

`GET /usuarios`

que obtiene los usuarios mediante una consulta SQL manual.

La nueva ruta:

`GET /usuarios/orm`

realiza la misma consulta utilizando **Sequelize**.

La comparación realizada entregó los mismos 2 registros mediante ambas rutas:

- Juan Actualizado
- Ana Torres

En ambos casos se obtuvieron los campos:

- `id`
- `nombre`
- `email`
- `fecha_creacion`

Esto permitió comprobar que el acceso mediante ORM obtiene los mismos datos que la consuta SQL manual.

#### Ventaja encontrada al utilizar ORM

La principal ventaja observada durante esta implementación fue la abstracción de las consultas SQL.

Con SQL manual es necesario escribir directamente la consulta:

```
SQL

SELECT id, nombre, email, fecha_creacion
FROM usuarios;
```

Mientras que con **Sequialize** es posible utilizar métodos del modelo:

```
JS

User.findAll({
    attributes: ["id", "nombre", "email", "fecha_creacion"]
});
```

Esto permite trabajar con los datos utilizando objetos y métodos de JavaScript, reduciendo la necesidad de escribir SQL directamente y facilitando la reutilización de los modelos cuando la aplicación crece.

Sin embargo, el ORM no elimina la necesidad de comprender SQL, ya que Sequelize genera consultas SQL internamente y sigue siendo necesario conocer la estructura y relaciones de la base de datos.

#### Evidencia

Se realizó una comparación entre las rutas:

```
GET /usuarios
GET /usuarios/orm
```

Ambas rutas devolvieron los mismos registros y campos.

![captura-comparacion-orm](/docs/captura-comparacion-orm-L5-M7.png)

---

### Lección 6: Manejo de relaciones en un ORM

En esta lección se implementaron relaciones entre modelos utilizando **Sequelize**, con el objetivo de consultar información relacionada mediante ORM.

Para aprovechar las tablas existentes del proyecto, se utilizó la relación entre:

- `usuarios`
- `historial_usuarios`

La tabla `historial_usuarios` contiene la información de las acciones realizadas por cada usuario mediante la clave foránea `usuario_id`.

#### Modelo HistorialUsuario

Se creó el modelo:

`models/HistorialUsuario.js`

Este modelo representa la tabla existente:

`historial_usuarios`

Se definieron los campos:

- `id`
- `usuario_id`
- `accion`
- `fecha`

Al igual que el modelo `User`, se configuró `tableName` para utilizar la tabla existente y `timestamps: false` para evitar que Sequelize agregue campos adicionales.

#### Relación entre los modelos

La relación se configuró en:

`models/associations.js`

Se definió una relación de tipo uno a muchos:

```
JS

User.hasMany(HistorialUsuario, {
    foreignKey: "usuario_id",
    as: "historial"
});
```

Esto significa que un usuario puede tener múltiples registros en `historial_usuarios`.

También se definió la relación inversa:

```
JS

HistorialUsuario.belongsTo(User, {
    foreignKey: "usuario_id",
    as; "usuario"
});
```

Esto indíca que cada registro del historial pertenece a un usuario.

Las asociaciones se centralizaron en `models/associations.js` para evitar dependencias circulares entre los modelos.

#### Consulta de datos relacionados

Se creó la ruta:

`GET /usuarios/orm/historial`

Esta ruta utiliza Sequelize y el parámetro `include` para obtener los usuarios junto con sus registros de historial relacionados.

La consulta utiliza la asociación previamente definida:

```
JS

const usuarios = await User.findAll({
    attributes: ["id", "nombre", "email"],
    include: [
	{
	    association: "historial",
	    attributes: ["id", "accion", "fecha"]
	}
    ]
});
```

El uso de `include` permite obtener los datos relacionados en una sola consulta ORM y entregarlos de forma anidada en la respuesta JSON.

#### Resultado

La ruta devuelve los usuarios junto con su historial:

```
JSON

[
    {
	"id": 4,
	"nombre": "Juan Actualizado",
	"email": "juan@example.com",
	"historial": []
    },
    {
	"id": 7,
	"nombre": "Ana Torres",
	"email": "ana.transaccion@example.com",
	"historial": [
	    {
		"id": 1,
		"accion": "Usuario registrado",
		"fecha": "2026-09-19T03:59:44:000Z"
	    }
	]
    }
]
```

En este resultado se puede observar que Juan no posee registros de historial, mientras que Ana posee un registro asociado.

Esto permite comprobar que la relación entre `usuarios` e `historial_usuarios` funciona correctamente mediante Sequelize.

#### Evidencia

Se realizó una prueba mediante:

`GET /usuarios/orm/historial`

La respuesta obtenida muestra los usuarios y sus registros relacionados de forma anidada.

![captura-relacion-orm](/docs/captura-relacion-orm-L6-M7.png)

---

## Módulo 8

### Lección 1: APIs RESTful

En esta lección se diseñaron e implementaron los principales endpoints REST de la aplicación para gestionar usuarios mediante los métodos HTTP `GET`, `POST`, `PUT` Y `DELETE`.

#### Diseño de endpoints

La API utiliza el recurso `usuarios` como recurso principal y sigue una estructura basada en convenciones REST:

| Método   | Endpoint        | Descripción                                   |
| -------- | --------------- | --------------------------------------------- |
| `GET`    | `/usuarios`     | Obtiene todos los usuarios.                   |
| `GET`    | `/usuarios/:id` | Obtiene un usuario específico mediante su ID. |
| `POST`   | `/usuarios`     | Crea un nuevo usuario.                        |
| `PUT`    | `/usuarios/:id` | Actualiza los datos de un usuario existente.  |
| `DELETE` | `/usuarios/:id` | Elimina un usuario existente.                 |

Los endpoints utilizan el sustantivo `usuarios` como recurso y los métodos HTTP determinan la operación que se realiza sobre este recurso.

#### Validación y manejo de errores

El endpoint `POST /usuarios` valida que los campos `nombre`, `email` y `password` estén presentes antes de realizar la inserción en la base de datos.

Si falta alguno de estos campos, la API responde con código `400` y un mensaje indicando los campos obligatorios.

Los endpoints que trabajan con un usuario específico verifican si el registro existe. Cuando no se encuentra el usuario solicitado, la API responde con código `404`.

#### Pruebas realizadas

Las rutas fueron probadas mediante `curl` desde la terminal, verificando tanto operaciones exitosas como casos de error.

Se comprobó:

- Creación de un usuario mediante `POST /usuarios`.
- Rechazo de una solicitud `POST` sin todos los campos obligatorios.
- Consulta de un usuario mediante `GET /usuarios/:id`.
- Respuesta `404`  al consultar un usuario inexistente.
- Actualización de un usuario mediante `PUT /usuarios/:id`.
- Eliminación de un usuario mediante `DELETE /usuarios/:id`.
- Verificación posterior de que el usuario eliminado ya no existe.

Como evidencia de las pruebas se incluye:

![captura-api-rest](/docs/captura-api-rest-L1-M8.png)

#### Resultado

Los endpoints REST principales funcionan correctamente y permiten realizar las operaciones básicas de creación, consulta, actualización y eliminación de usuarios utilizando los métodos HTTP correspondientes.

La implementación utiliza consultas SQL parametrizadas para interactuar con MySQL y mantiene las rutas dentro del archivo `routes/usuarios.js`. La separación de la lógica en controladores será abordada en la siguiente lección.

---

### Lección 2: Implementación de una API REST

En esta lección se reorganizó la implementación de la API REST para separar las responsabilidades entre rutas, controladores y middlewares.

La estructura utilizada permite que las rutas definan los endpoints, los controladores contengan la lógica de acceso a los datos y los middlewares realicen validaciones antes de ejecutar determinadas operaciones.

#### Estructura utilizada

La implementación se organizó de la siguiente manera:

```
routes/
    usuarios.js (Define los endpoints de la API.)

controllers/
    usuariosController.js (Contiene la lógica de las operaciones sobre usuarios.)

middlewares/
    validarUsuario.js (Contiene las validaciones de las solicitudes.)

```
Esta separación permite mantener el código organizado y facilita su mantenimiento y amplicación.

#### Controladores

Se creó `controllers/usuariosController.js` con las funciones correspondientes a las principales operaciones REST:

- `obtenerUsuarios`: Obtiene todos los usuarios.
- `obtenerUsuarioPorId`: Obtiene un usuario mediante su ID.
- `crearUsuario`: Registra un nuevo usuario.
- `actualizarUsuario`: Modifica los datos permitidos de un usuario.
- `eliminarUsuario`: Elimina un usuario existente.

Las rutas de `routes/usuarios.js` se encargan de asociar cada endpoint con su controlador correspondiente.

#### Validación mediante middleware

Se creó `middlewares/validarUsuario.js` para centralizar las validaciones de entrada.

Para `POST /usuarios/:id` se verifica que se proporcione al menos uno de los campos permitidos:

- `nombre`
- `email`

Cuando una solicitud no cumple estas condiciones, el middleware responde con código HTTP `400` y evita que la operación llegue al controlador.

#### Manejo de errores

Los controladores verifican situaciones como:

- Usuario inexistente -> respuesta HTTP `404`.
- Datos obligatorios ausentes -> respuesta HTTP `400`.
- Errores durante las consultas MySQL -> respuesta HTTP `500`.

Los mensajes enviados al cliente no exponen detalles internos de la base de datos.

#### Pruebas realizadas

Se realizaron pruebas con la API utilizando `curl` desde la terminal y el servidor conectado a MySQL.

Se comprobó:

- `GET /usuarios` -> Obtiene correctamente los usuarios.
- `GET /usuarios/:id` -> Obtiene correctamente un usuario existente.
- `POST /usuario` -> Crea correctamente un usuario.
- `POST /usuarios` sin `password` -> devuelve `400`.
- `PUT /usuarios/:id` -> Actualiza correctamente un usuario.
- `PUT /usuarios/:id` sin datos de actualización -> Devuelve `400`.
- `DELETE /usuarios/:id` -> Elimina correctamente un usuario.
- `DELETE /usuarios/:id` con un ID inexistente -> Devuelve `404`.

Las pruebas de creación, actualización y eliminación utilizaros un usuario temporal, que posteriormente fue eliminado correctamente.

#### Evidencias

- Pruebas exitosas de Endpoints

![capturad-tests-exito](/docs/captura-tests-exito-L2-M8.png)

- Validaciones y respuestas de error

![captura-tests-error](/docs/captura-tests-error-L2-M8.png)


#### ¿Porqué la separación?

La separación entre rutas, controladores y middlewares evita concentrar toda la lógica de la aplicación en un único archivo.

Las rutas se encargan de definir los endpoints, los controladores gestionan las operaciones sobre los datos y los middlewares permiten reutilizar validaciones antes de ejecutar determinadas operaciones.

Esta estructura facilita el mantenimiento del proyecto y permite incorporar nuevas funcionalidades en las siguientes etapas.