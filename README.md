# Evaluación - App Gestión de usuarios y datos
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
El proyecto fue configurado usando Node.js v24.12.0 y npm v12.0.2. Se utilizó `npm init`para crear el archivo `package.json`
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

Express y dotenv se declararon como dependencias del proyecto, mientras que Nodemon se configuró como dependencia de desarrollo.

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
