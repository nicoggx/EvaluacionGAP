const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

const empresaController = require('./../controllers/empresaController');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/listar', empresaController.listar)
router.post('/crear', urlencodedParser, empresaController.crear)
router.post('/actualizar/:id', urlencodedParser, empresaController.actualizar);
router.post('/eliminar', urlencodedParser, empresaController.eliminar);

module.exports = router;