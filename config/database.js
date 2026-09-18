// Importa el módulo mysql2 para conectarse a MySQL.
const mysql = require("mysql2");

// Crea un pool de conexiones utilizando las variables de entorno.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Verifica que la conexión con la base de datos funcione correctamente.
pool.getConnection((error, connection) => {
    if (error) {
        console.error("Error al conectar con MySQL:", error.message);
        return;
    }

    console.log("Conexión con MySQL establecida correctamente.");

    connection.release();
});

// Exporta el pool para utilizalo desde otras partes de la aplicación.
module.exports = pool;