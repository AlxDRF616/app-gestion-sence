// Se cargan las variables de entorno definidas en el archivp '.env'.
require("dotenv").config();

// Importa el framework Express.
const express = require("express");

// Importación del módulo de Node.js para trabajar con el sistema de archivos.
const fs = require("fs");

// Crea la aplicación Express.
const app = express();

// Define el puerto utilizando la variable de entorno PORT.
const PORT = process.env.PORT || 3000;

//Registra en log.txt la fecha, hora y ruta de cada acceso.
function registrarVisita(ruta) {
    const ahora = new Date();

    const fecha = ahora.toLocaleDateString("es-CL");
    const hora = ahora.toLocaleTimeString("es-CL");

    const registro = `${fecha} | ${hora} | ${ruta}\n`;

    fs.appendFile("log.txt", registro, (error) => {
        if (error) {
            console.error("Error al registrar la visita:", error);
        }
    });
}

// Sirve los archivos estáticos contenidos en la carpeta public.
app.use(express.static("public", { index: false }));

// Ruta pública principal que responde con contenido HTML generado por express.
app.get("/", (req, res) => {
    res.send(`
        <h1>Bienvenido a App Gestión </h1>
        <p>Esta página fue generada directamente por Express.</p> 
    `);
});

// Ruta pública que entrega información del estado del seridor en formato JSON.
app.get("/status", (req, res) => {
    //Registra el acceso a esta ruta en el archivo de log.
registrarVisita(req.path);

    res.json({
        status: "OK",
        message: "Servidor funcionando correctamente"
    });
});

// Inicia el servidor y comienza a escuchar solicitudes.
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});