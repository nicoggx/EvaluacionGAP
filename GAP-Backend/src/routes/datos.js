const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

const datosController = require('./../controllers/datosController');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/listar', datosController.listar);
router.post('/crear', urlencodedParser, datosController.crear);
router.post('/cambiarEstado/:id', urlencodedParser, datosController.cambiarEstado);

module.exports = router;