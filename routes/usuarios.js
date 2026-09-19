// Importación de Express para crear las rutas.
const express = require("express");

// Importación el pool de conexiones a MySQL.
const db = require("../config/database");

// Crea un router de Express.
const router = express.Router();

//Ruta GET para obtener los usuarios.
router.get("/usuarios", (req, res) => {
    db.query(
        "SELECT id, nombre, email, fecha_creacion FROM usuarios",
        (error, resultados) => {
            if (error) {
                console.error("Error al consultar usuarios:", error.message);
                return res.status(500).json({
                    error: "No fue posible obtener los usuarios."
                });
            }
            // Procesa los resultados antes de enviarlos al cliente.
            const usuarios = resultados.map((usuario) => ({
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                fecha_creacion: usuario.fecha_creacion
            }));
            res.json(usuarios);
        }
    );
});

module.exports = router;