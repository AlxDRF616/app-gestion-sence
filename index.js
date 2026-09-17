// Se cargan las variables de entorno definidas en el archivp '.env'.
require("dotenv").config();

// Mensaje de consola que es útil para saber si el programa fue iniciado correctamente.
console.log("Servidor iniciado");

// Mensaje de consola que muestra le puerto configurado a traves de la variable de entorno PORT.
console.log(`Puerto configurado: ${process.env.PORT}`);
