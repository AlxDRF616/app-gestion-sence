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
