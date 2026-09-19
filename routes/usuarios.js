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

// Ruta PUT para actualizar los datos de un usuario.
router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;

    // Verifica que al menos uno de los campos permitidos haya sido enviado.
    if (!nombre && !email) {
        return res.status(400).json({
            error: "Debe proporcionar nombre o email para actualizar."
        });
    }

    // Verifica previamente que el usuario exista.
    db.query(
        "SELECT id FROM usuarios WHERE id = ?",
        [id],
        (error, resultados) => {
            if (error) {
                console.error("Error al verificar usuario:", error.message);
                return res.status(500).json({
                    error: "No fue posible verificar el usuario."
                });
            }

            if (resultados.length === 0) {
                return res.status(404).json({
                    error: "Usuario no encontrado."
                });
            }

            // Construye la consulta según los campos recibidos.
            const campos = [];
            const valores = [];

            if (nombre) {
                campos.push("nombre = ?");
                valores.push(nombre);
            }

            if (email) {
                campos.push("email = ?");
                valores.push(email);
            }

            valores.push(id);

            const consulta = `UPDATE usuarios SET ${campos.join(", ")} WHERE id = ?`;

            // Ejecuta la actualización después de comprobar que el usuario existe.
            db.query(consulta, valores, (error) => {
                if (error) {
                    console.error("Error al actualizar usuario:", error.message);
                    return res.status(500).json({
                        error: "No fue posible actualizar el usuario."
                    });
                }

                res.json({
                    mensaje: "Usuario actualizado correctamente."
                });
            });
        }
    );
});

// Ruta DELETE para eliminar un usuario.
router.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    // Verifica previamente que el usuario exista.
    db.query(
        "SELECT id FROM usuarios WHERE id = ?",
        [id],
        (error, resultados) => {
            if (error) {
                console.error("Error al verificar usuario:", error.message);
                return res.status(500).json({
                    error: "No fue posible verificar el usuario."
                });
            }

            if (resultados.length === 0) {
                return res.status(404).json({
                    error: "Usuario no encontrado."
                });
            }

            // Elimina el usuario después de comprobar que existe.
            db.query(
                "DELETE FROM usuarios WHERE id = ?",
                [id],
                (error) => {
                    if (error) {
                        console.error("Error al eliminar usuario:", error.message);
                        return res.status(500).json({
                            error: "No fue posible eliminar el usuario."
                        });
                    }

                    res.json({
                        mensaje: "Usuario eliminado correctamente."
                    });
                }
            );
        }
    );
});

module.exports = router;