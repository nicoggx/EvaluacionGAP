var Sequelize = require('sequelize');
var sequelize = require('./database');
var nametable = 'datos';
var Empresa = require('./empresa');

var Datos = sequelize.define(nametable, {
    iddato: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoDato: Sequelize.STRING,
    estado: {
        type: Sequelize.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    }
}, {
    timestamps: false
});


module.exports = Datos;