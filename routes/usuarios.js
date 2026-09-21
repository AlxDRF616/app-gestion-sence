// Importación de Express para crear las rutas.
const express = require("express");

// Importación el pool de conexiones a MySQL.
const db = require("../config/database");

//Importación del modelo User para el ORM
const { User } = require("../models/associations");

const {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require("../controllers/usuariosController");

const {
    validarUsuario,
    validarActualizacionUsuario
} = require("../middlewares/validarUsuario");

const upload = require("../middlewares/upload");

// Crea un router de Express.
const router = express.Router();

//Ruta GET para obtener los usuarios.
router.get("/usuarios", obtenerUsuarios);

// GET para obtener un usuario por ID
router.get("/usuarios/:id", obtenerUsuarioPorId);

// Ruta PUT para actualizar los datos de un usuario.
router.put("/usuarios/:id", validarActualizacionUsuario, actualizarUsuario);

// Ruta DELETE para eliminar un usuario.
router.delete("/usuarios/:id", eliminarUsuario);

router.post("/usuarios", validarUsuario, crearUsuario);

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

// Ruta GET para consultar usuarios utilizando Sequelize.
router.get("/usuarios/orm", async (req, res) => {
    try {
	const usuarios = await User.findAll({
	    attributes: ["id", "nombre", "email", "fecha_creacion"]
	});

	res.json(usuarios);
    } catch (error) {
	console.error("Error al consultar usuarios con Sequelize:", error.message);

	res.status(500).json({
	    error: "No fie posible consultar los usuarios mediante ORM."
	});
    }
});

router.get("/usuarios/orm/historial", async (req, res) => {
    try {
        const usuarios = await User.findAll({
            attributes: ["id", "nombre", "email"],
            include: [
                {
                    association: "historial",
                    attributes: ["id", "accion", "fecha"]
                }
            ]
        });

        res.json(usuarios);
    } catch (error) {
        console.error("Error al consultar usuarios con historial:", error.message);

        res.status(500).json({
            error: "No fue posible consultar los usuarios y su historial."
        });
    }
});

router.post("/upload", upload.single("archivo"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            error: "No se recibió ningún archivo."
        });
    }

    res.status(201).json({
        mensaje: "Archivo subido correctamente.",
        archivo: {
            nombre: req.file.filename,
            ruta: `/uploads/${req.file.filename}`
        }
    });
});

module.exports = router;
