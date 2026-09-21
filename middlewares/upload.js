const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento de los archivos.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },

    filename: (req, file, cb) => {
        const nombreUnico = `${Date.now()}-${file.originalname}`;
        cb(null, nombreUnico);
    }
});

// Tipos de archivo permitidos.
const fileFilter = (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png|gif/;
    const extension = path.extname(file.originalname).toLowerCase();
    const tipoMime = tiposPermitidos.test(file.mimetype);

    if (tipoMime && tiposPermitidos.test(extension)) {
        cb(null, true);
    } else {
        cb(new Error("Tipo de archivo no permitido."));
    }
};

// Configuración final de Multer.
const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;