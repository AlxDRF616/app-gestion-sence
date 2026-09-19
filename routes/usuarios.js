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

// Ruta POST para registrar un usuario y crear su historial dentro de una transacción.
router.post("/usuarios/transaccion", (req, res) => {
    const { nombre, email, password, forzarError } = req.body;

    // Obtiene una conexión individual del pool para ejecutar la transacción.
    db.getConnection((error, connection) => {
        if (error) {
            console.error("Error al obtener conexión para la transacción:", error.message);
            return res.status(500).json({
                error: "No fue posible iniciar la transacción."
            });
        }

        // Inicia la transacción.
        connection.beginTransaction((error) => {
            if (error) {
                console.error("Error al iniciar la transacción:", error.message);
                connection.release();

                return res.status(500).json({
                    error: "No fue posible iniciar la transacción."
                });
            }

            console.log("Transacción iniciada correctamente.");

                        // Inserta el nuevo usuario dentro de la transacción.
            connection.query(
                "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
                [nombre, email, password],
                (error, resultado) => {
                    if (error) {
                        console.error("Error al crear usuario:", error.message);

                        return connection.rollback(() => {
                            connection.release();

                            res.status(500).json({
                                error: "No fue posible crear el usuario. La transacción fue revertida."
                            });
                        });
                    }

                    console.log("Usuario creado dentro de la transacción.");

                                        // Permite forzar un error para demostrar el rollback.
                    if (forzarError) {
                        return connection.query(
                            "INSERT INTO historial_usuarios (usuario_id, accion) VALUES (?, ?)",
                            [resultado.insertId, null],
                            (error) => {
                                if (error) {
                                    console.error("Error forzado al crear historial:", error.message);

                                    return connection.rollback(() => {
                                        connection.release();

                                        res.status(500).json({
                                            error: "La segunda operación falló. La transacción fue revertida."
                                        });
                                    });
                                }
                            }
                        );
                    }

                    // Crea el registro de historial asociado al usuario creado.
                    connection.query(
                        "INSERT INTO historial_usuarios (usuario_id, accion) VALUES (?, ?)",
                        [resultado.insertId, "Usuario registrado"],
                        (error) => {
                            if (error) {
                                console.error("Error al crear historial:", error.message);

                                return connection.rollback(() => {
                                    connection.release();

                                    res.status(500).json({
                                        error: "No fue posible crear el historial. La transacción fue revertida."
                                    });
                                });
                            }

                            console.log("Historial creado dentro de la transacción.");

                                                        // Confirma definitivamente las dos operaciones.
                            connection.commit((error) => {
                                if (error) {
                                    console.error("Error al confirmar la transacción:", error.message);

                                    return connection.rollback(() => {
                                        connection.release();

                                        res.status(500).json({
                                            error: "No fue posible confirmar la transacción. Los cambios fueron revertidos."
                                        });
                                    });
                                }

                                console.log("Transacción confirmada correctamente.");

                                connection.release();

                                res.status(201).json({
                                    mensaje: "Usuario e historial creados correctamente."
                                });
                            });
                        }
                    );
                }
            );
        });
    });
});

module.exports = router;