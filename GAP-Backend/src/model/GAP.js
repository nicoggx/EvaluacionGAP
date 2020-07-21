var Sequelize = require('sequelize');
var sequelize = require('./database');
var Usuario = require('./user')
var nametable = 'gap';

var GAP = sequelize.define(nametable, {
    idgap: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idusuario: {
        type: Sequelize.INTEGER,
        references: {
            model: Usuario,
            key: 'idusuario'
        }
    },
    nombreAnalisis: Sequelize.STRING,
    parametros: Sequelize.STRING(20000),
    json: Sequelize.STRING(20000),
}, {
    timestamps: true
})



module.exports = GAP;