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

//Crear usuarios
controllers.crear = async(req, res) => {
    // data
    const { nombreTipo } = req.body;
    // create
    const data = await Tipousuario.create({
            nombreTipo: nombreTipo,

        })
        .then(function(data) {
            var obj = {
                success: true,
                message: "Creado exitosamente"
            }
            return obj;
        })
        .catch(error => {
            var obj = {
                success: false,
                message: error
            }
            return obj;
        })
        // return res
    res.status(200).json({
        data: data
    });
}

controllers.cambiarEstado = async(req, res) => {
    // data
    const { id } = req.params;
    const { estado } = req.body;
    // create
    const data = await Tipousuario.update({
            estado: estado,
        }, {
            where: { idtipo: id }
        })
        .then(function(data) {
            var obj = {
                success: true,
                message: "Actualizado exitosamente"
            }
            return obj;
        })
        .catch(error => {
            var obj = {
                success: false,
                message: error
            }
            return obj;
        })
        // return res
    res.status(200).json({
        data: data
    });
}

module.exports = controllers;