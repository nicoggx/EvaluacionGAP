const controllers = {}

var sequelize = require('./../model/database');
var Empresa = require('./../model/empresa');
var User = require('./../model/user');

//Listar empresas
controllers.listar = async(req, res) => {
    const data = await Empresa.findAll()
        .then(function(data) {
            return data;
        })
        .catch(error => {
            return error;
        })

    res.json({ success: true, data: data })
}

//Crear empresa
controllers.crear = async(req, res) => {
    // data
    const { nombre_empresa, correo_empresa, idusuario } = req.body;
    // create
    const data = await Empresa.create({
            nombre_empresa: nombre_empresa,
            correo_empresa: correo_empresa,
            idusuario: idusuario
        })
        .then(function(data) {
            return data;
        })
        .catch(error => {
            console.log("Error " + error)
            return error;
        })
        // return res
    res.status(200).json({
        success: true,
        message: "Creado exitosamente",
        data: data
    });
}

//Actualizar empresa
controllers.actualizar = async(req, res) => {
    console.log('req.body ', req.body);
    // data
    const { id } = req.params;
    const { nombre_empresa, correo_empresa, idusuario } = req.body;
    // create
    const data = await Empresa.update({
            nombre_empresa: nombre_empresa,
            correo_empresa: correo_empresa,
            idusuario: idusuario
        }, {
            where: { idempresa: id }
        })
        .then(function(data) {
            return data;
        })
        .catch(error => {
            console.log("Error " + error)
            return error;
        })
        // return res
    res.status(200).json({
        success: true,
        message: "Actualizado exitosamente"
    });
}

controllers.eliminar = async(req, res) => {
    const { idempresa } = req.body;
    const del = await Empresa.destroy({
        where: { idempresa: idempresa }
    })
    res.json({ success: true, deleted: del, message: "Eliminado Correctamente!" });
}

module.exports = controllers;