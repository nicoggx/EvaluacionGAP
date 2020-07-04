const controllers = {}

var sequelize = require('./../model/database');
var User = require('./../model/user');

sequelize.sync()

//Listar usuarios
controllers.listar = async(req, res) => {
    const data = await User.findAll({})
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
    console.log('req.body ', req.body);
    // data
    const { email, contraseña } = req.body;
    // create
    const data = await User.create({
            email: email,
            contraseña: contraseña,
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


//Actualizar usuario
controllers.actualizar = async(req, res) => {
    // data
    const { id } = req.params;
    const { email, contraseña } = req.body;
    // create
    const data = await User.update({
            email: email,
            contraseña: contraseña,
        }, {
            where: { idusuario: id }
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
        message: "Actualizado exitosamente",
        data: data
    });
}

controllers.eliminar = async(req, res) => {
    const { idusuario } = req.body;
    const del = await User.destroy({
        where: { idusuario: idusuario }
    })
    res.json({ success: true, deleted: del, message: "Eliminado Correctamente!" });
}

module.exports = controllers;