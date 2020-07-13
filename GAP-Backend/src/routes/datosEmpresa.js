const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

const datosEmpresasController = require('./../controllers/datosEmpresasController');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/listar/:idempresa', datosEmpresasController.listar);
router.post('/crear', urlencodedParser, datosEmpresasController.crear);
router.post('/eliminar', urlencodedParser, datosEmpresasController.eliminar);

module.exports = router;