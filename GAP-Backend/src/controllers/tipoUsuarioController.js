const controllers = {}

var sequelize = require('./../model/database');
var Tipousuario = require('./../model/tipoUsuario');

sequelize.sync()

//Listar usuarios
controllers.listar = async(req, res) => {
    const data = await Tipousuario.findAll({})
        .then(function(data) {
            return data;
        })
        .catch(error => {
            return error;
        })

    res.json({ success: true, data: data })
}

module.exports = controllers;