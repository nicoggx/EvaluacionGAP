const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

const GAPcontroller = require('./../controllers/GAPController');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/listarGAP',urlencodedParser,  GAPcontroller.listarGAP);
router.post('/evaluarGAP', urlencodedParser, GAPcontroller.calcularGAP);


module.exports = router;