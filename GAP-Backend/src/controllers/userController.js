const controllers = {}

var sequelize = require('./../model/database');
var User = require('./../model/user');
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;

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
var generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

var passwordValida = function(userpass, password){
    return bCrypt.compareSync(password, userpass);
}

//Crear usuarios
controllers.crear = async(req, res) => {
    // data
    const { email, password, tipoUsuario } = req.body;
    var userPassword = generateHash(password);

    // create
    const data = await User.create({
            email: email,
            password: userPassword,
            tipoUsuario: tipoUsuario
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


//Actualizar usuario
controllers.actualizar = async(req, res) => {
    // data
    const { id } = req.params;
    const { email, password } = req.body;
    
    var userPassword = generateHash(password);

    // create
    const data = await User.update({
            email: email,
            password: userPassword,
        }, {
            where: { idusuario: id }
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
    const { idusuario } = req.body;
    const del = await User.destroy({
        where: { idusuario: idusuario }
    })
    res.json({ success: true, deleted: del, message: "Eliminado Correctamente!" });
}

controllers.iniciarSesion = async(req, res) =>{
    const {email, password} = req.body;
    
    const data = await User.findOne({
        where: {
            email:email
        }
    }).then(function(user){
        if(!user){
            var obj ={
                login: false,
                message:'Correo no existe'
            }
            return obj
            
        }

        if(!passwordValida(user.password, password)){
            var obj ={
                login: false,
                message:'Password incorrecta'
            }
            return obj
        };

        var obj ={
            login: true,
            message:''
        }
        return obj

    })

    res.json({ data:data });

};

controllers.comprobarExistenciaCorreo = async(req, res) =>{
    const { email } = req.body;
    const data = await User.findOne({
        where: {
            email:email
        }
    }).then(function(user){
        if(!user){
            var obj = {
                existe:false
            }
        }else{
            var obj = {
                existe:true
            }
        }
        return obj;
    });
    res.json({ data:data });


}

module.exports = controllers;