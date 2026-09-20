const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const HistorialUsuario = sequelize.define(
    "HistorialUsuario",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        accion: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: "historial_usuarios",
        timestamps: false
    }
);

module.exports = HistorialUsuario;
