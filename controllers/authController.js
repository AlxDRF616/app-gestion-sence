const jwt = require("jsonwebtoken");
const db = require("../config/database");

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email y password son obligatorios."
        });
    }

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [email], (error, resultados) => {
        if (error) {
            console.error("Error al buscar usuario:", error.message);

            return res.status(500).json({
                error: "Error interno del servidor."
            });
        }

        if (resultados.length === 0) {
            return res.status(401).json({
                error: "Credenciales inválidas."
            });
        }

        const usuario = resultados[0];

        if (usuario.password !== password) {
            return res.status(401).json({
                error: "Credenciales inválidas."
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            mensaje: "Autenticación exitosa.",
            token
        });
    });
};

module.exports = {
    login
};
