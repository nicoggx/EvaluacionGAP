var Sequelize = require('sequelize');
var sequelize = require('./database');
var nametable = 'usuario';

var User = sequelize.define(nametable, {
    idusuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: Sequelize.STRING,
    tipoUsuario:{
        type:Sequelize.INTEGER,
        allowNull:false

    },
    password: {
        type:Sequelize.STRING,
        allowNull:false
    },
    last_login:{
        type:Sequelize.DATE
    },
    estado:{
        type:Sequelize.ENUM('activo','inactivo'),
        defaultValue: 'activo'
    }
});


module.exports = User;