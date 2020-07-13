const controllers = {}

var sequelize = require('./../model/database');
var Datos = require('./../model/datos');

controllers.listar = async(req, res) => {
    const data = await Datos.findAll({})
        .then(function(data) {
            return data;
        })
        .catch(error => {
            return error;
        })

    res.json({ success: true, data: data })
};

controllers.crear = async(req, res) => {
    // data
    const { tipoDato } = req.body;

    // create
    const data = await Datos.create({
            tipoDato: tipoDato,
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
    const data = await Datos.update({
            estado: estado,
        }, {
            where: { iddato: id }
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