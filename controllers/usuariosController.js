const db = require("../config/database");

// Obtener todos los usuarios.
const obtenerUsuarios = (req, res) => {
    db.query(
        "SELECT id, nombre, email, fecha_creacion FROM usuarios",
        (error, resultados) => {
            if (error) {
                console.error("Error al consultar usuarios:", error.message);

                return res.status(500).json({
                    error: "No fue posible obtener los usuarios."
                });
            }

            const usuarios = resultados.map((usuario) => ({
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                fecha_creacion: usuario.fecha_creacion
            }));

            res.json(usuarios);
        }
    );
};

// Obtener un usuario por su ID.
const obtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;

    db.query(
        "SELECT id, nombre, email, fecha_creacion FROM usuarios WHERE id = ?",
        [id],
        (error, resultados) => {
            if (error) {
                console.error("Error al consultar usuario:", error.message);

                return res.status(500).json({
                    error: "No fue posible obtener el usuario."
                });
            }

            if (resultados.length === 0) {
                return res.status(404).json({
                    error: "Usuario no encontrado."
                });
            }

            res.json(resultados[0]);
        }
    );
};

// Crear un nuevo usuario.
const crearUsuario = (req, res) => {
    const { nombre, email, password } = req.body;

    db.query(
        "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
        [nombre, email, password],
        (error, resultado) => {
            if (error) {
                console.error("Error al crear usuario:", error.message);

                return res.status(500).json({
                    error: "No fue posible crear el usuario."
                });
            }

            res.status(201).json({
                mensaje: "Usuario creado correctamente.",
                usuario: {
                    id: resultado.insertId,
                    nombre,
                    email
                }
            });
        }
    );
};

// Actualizar los datos de un usuario.
const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;

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
};

// Eliminar un usuario.
const eliminarUsuario = (req, res) => {
    const { id } = req.params;

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
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
