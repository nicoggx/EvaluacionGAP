const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

const userController = require('./../controllers/userController');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/listar', userController.listar);
router.post('/iniciarSesion', urlencodedParser, userController.iniciarSesion);
router.post('/comprobarExistenciaCorreo', urlencodedParser, userController.comprobarExistenciaCorreo);
router.post('/crear', urlencodedParser, userController.crear);
router.post('/actualizar/:id', urlencodedParser, userController.actualizar);
router.post('/eliminar', urlencodedParser, userController.eliminar);
router.post('/cambiarTipoUsuario/:id', urlencodedParser, userController.cambiarTipoUsuario);


module.exports = router;