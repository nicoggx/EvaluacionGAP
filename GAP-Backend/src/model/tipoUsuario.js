var Sequelize = require('sequelize');
var sequelize = require('./database');
var nametable = 'tipoUsuario';

var TipoUsuario = sequelize.define(nametable, {
    idtipo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreTipo: Sequelize.STRING,

}, {
    timestamps: false
});


module.exports = TipoUsuario;