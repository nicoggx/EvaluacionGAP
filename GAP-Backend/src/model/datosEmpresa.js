var Sequelize = require('sequelize');
var sequelize = require('./database');
var nametable = 'datosEmpresas';
var Empresa = require('./empresa');
var Datos = require('./datos');

var datosEmpresas = sequelize.define(nametable, {
    iddatoEmpresa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idempresa: {
        type: Sequelize.INTEGER,
        references: {
            model: Empresa,
            key: 'idempresa'
        }
    },
    iddato: {
        type: Sequelize.INTEGER,
        references: {
            model: Datos,
            key: 'iddato'
        }
    },
    valorDato: Sequelize.STRING,
    estado: {
        type: Sequelize.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    },
}, {
    timestamps: false
});


module.exports = datosEmpresas;