var Sequelize = require('sequelize');
var sequelize = require('./database');
const router = require('../routes/user');
var nametable = 'usuario';

var User = sequelize.define(nametable, {
    idusuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: Sequelize.STRING,
    contraseña: Sequelize.STRING,
})


module.exports = User;