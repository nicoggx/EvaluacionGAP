var Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'empresa';

var Empresa = sequelize.define(nametable, {
    idempresa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_empresa: Sequelize.STRING,
    correo_empresa: Sequelize.STRING

}, {
    timestamps: false
})

module.exports = Empresa;