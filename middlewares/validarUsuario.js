const  validarUsuario = (req, res, next) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({
            error: "Nombre, email y password son obligatorios."
        });
    }

    next();
};

const validarActualizacionUsuario = (req, res, next) => {
    const { nombre, email } = req.body;

    if (!nombre && !email) {
        return res.status(400).json({
            error: "Debe proporcionar nombre o email para actualizar."
        });
    }
    next();
};

module.exports = {
    validarUsuario,
    validarActualizacionUsuario
};