// Se cargan las variables de entorno definidas en el archivp '.env'.
require("dotenv").config();

// Importa el framework Express.
const express = require("express");

// Crea la aplicación Express.
const app = express();

// Define el puerto utilizando la variable de entorno PORT.
const PORT = process.env.PORT || 3000;

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
    res.json({
        status: "OK",
        message: "Servidor funcionando correctamente"
    });
});

// Inicia el servidor y comienza a escuchar solicitudes.
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});