var Sequelize = require('sequelize');
var sequelize = require('./database');
var User = require('./user');

var nametable = 'empresa';

var Empresa = sequelize.define(nametable, {
    idempresa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_empresa: Sequelize.STRING,
    correo_empresa: Sequelize.STRING,
    idusuario: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'idusuario'
        }
    }

}, {
    timestamps: false
})

module.exports = Empresa;