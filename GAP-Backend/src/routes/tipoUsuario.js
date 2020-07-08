const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

const tipoUsuarioController = require('./../controllers/tipoUsuarioController');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/listar', tipoUsuarioController.listar);
// router.post('/iniciarSesion',urlencodedParser, tipoUsuarioController.iniciarSesion);
// router.post('/comprobarExistenciaCorreo', urlencodedParser, tipoUsuarioController.comprobarExistenciaCorreo);
// router.post('/crear', urlencodedParser, tipoUsuarioController.crear);
// router.post('/actualizar/:id', urlencodedParser, tipoUsuarioController.actualizar);
// router.post('/eliminar', urlencodedParser, tipoUsuarioController.eliminar);


module.exports = router;
