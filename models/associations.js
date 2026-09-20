const User = require("./User");
const HistorialUsuario = require("./HistorialUsuario");

User.hasMany(HistorialUsuario, {
    foreignKey: "usuario_id",
    as: "historial"
});

HistorialUsuario.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "usuario"
});

module.exports = {
    User,
    HistorialUsuario
};
