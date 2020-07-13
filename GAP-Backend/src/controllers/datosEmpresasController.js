const controllers = {}

var sequelize = require('./../model/database');
var datosEmpresa = require('./../model/datosEmpresa');

controllers.listar = async(req, res) => {
    const { idempresa } = req.params;
    const data = await datosEmpresa.findAll({
            where: { idempresa: idempresa }
        })
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
    const { idempresa, iddato } = req.body;

    // create
    const data = await datosEmpresa.create({
            idempresa: idempresa,
            iddato: iddato
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
    const data = await datosEmpresa.update({
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

controllers.eliminar = async(req, res) => {
    const { iddatoEmpresa } = req.body;
    const del = await datosEmpresa.destroy({
        where: { iddatoEmpresa: iddatoEmpresa }
    })
    res.json({ success: true, deleted: del, message: "Eliminado Correctamente!" });
}

module.exports = controllers;