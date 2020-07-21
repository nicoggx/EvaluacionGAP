const controllers = {}
var moment = require('moment');
var sequelize = require('./../model/database');
var Sequelize = require('sequelize')
const Op = Sequelize.Op

var GAP = require('./../model/GAP');

//Listar usuarios
controllers.listar = async(req, res) => {
    const data = await GAP.findAll({
    })
        .then(function(data) {
            return data;
        })
        .catch(error => {
            return error;
        })

    res.json({ success: true, data: data })
}

controllers.listarGAP =async(req, res) => {
    
    var query = `SELECT g.nombreAnalisis, g.parametros, g.json, g.createdAt AS fecha_creacion,
    e.nombre_empresa, u.idusuario, u.email
    FROM gaps g 
    INNER JOIN usuarios AS u ON u.idusuario = g.idusuario
    INNER JOIN empresas AS e ON e.idempresa = u.idempresa
    WHERE true `

    if(req.body.nombreGAP){
        query += ` AND g.nombreAnalisis like '%${req.body.nombreGAP}%'`
    }

    if(req.body.fechaDesde){
        var fechaDesde = moment(req.body.fechaDesde, 'DD-MM-YYYY').format();
        query += ` AND g.createdAt >= '${fechaDesde}'`
    }

    if(req.body.fechaHasta){
        var fechaHasta =moment(req.body.fechaHasta, 'DD-MM-YYYY').format();
        query += ` AND g.createdAt <= '${fechaHasta}'`
    }
    
    if(req.body.idempresa){
        query += ` AND e.idempresa = ${req.body.idempresa}`
    }
    query += ` ORDER BY g.createdAt ASC`


    

    var idempresa = req.body.idempresa;
    const [results, metadata] = await sequelize.query(query)
        .then(([results, metadata]) => {
            return results;
        })
        .catch(error => {
            return error;
        })
        var resultado;
        if(results){
            resultado=results;
        }else{
            resultado='No hay resultados'
        }

    res.json({ success: true, data: resultado })
}

controllers.calcularGAP = async(req, res) => {
    var data = JSON.parse(req.body.data);
    var nombreGAP = req.body.nombreGAP;
    var idusuario = req.body.idusuario;
    var info = data[0]
    var resa = data[1]
    var actual;
    var siguiente=resa[0].chck;
    var evaluacion = [];
    var totalDominio=0;
    var contar=0;
    for (var i = 0; i < resa.length; i++) {
        if(i>0){
           if(actual !==siguiente){
            evaluacion.push(dominio);
            contar=0;
            totalDominio=0;
           };
       };
       
       var dominio = {};
       actual=resa[i].chck;

       var total=0;
       var contador =0;
       var values = resa[i].values.split(',')
       values.forEach(v =>{
        if(v === 'true'){
            contador++;
        }
       });
       contar++;
       if(contador>=2){
        total=1;
       }
       totalDominio=totalDominio+total
       if(i>0){
           if(i+1 !== resa.length){
            siguiente = resa[i+1].chck;
           }else{
            dominio.nombre = resa[i].Dominio;
            dominio.check = resa[i].chck;
            dominio.total=totalDominio;
            dominio.PorcentajeCumplido=(((totalDominio*100)/(contar*100))*100)+'%';
            dominio.PorcentajeNoCumplido=(100- (((totalDominio*100)/(contar*100))*100))+'%';
            evaluacion.push(dominio);
           }
        if(actual !==siguiente){
            dominio.nombre = resa[i].Dominio;
            dominio.check = resa[i].chck;
            dominio.total=totalDominio;
            dominio.PorcentajeCumplido=(((totalDominio*100)/(contar*100))*100)+'%';
            dominio.PorcentajeNoCumplido=(100- (((totalDominio*100)/(contar*100))*100))+'%';
        }
    }

    }
    const date = await GAP.create({
        idusuario : idusuario,
        nombreAnalisis: nombreGAP,
        parametros: JSON.stringify(resa),
        json:JSON.stringify(evaluacion)
    })
    .then(function(date) {
        var obj = {
            success: true,
            message: "Creado exitosamente",
            data: evaluacion
        }
        return obj;
    })
    .catch(error => {
        var obj = {
            success: false,
            message: error,
            data: []
        }
        return obj;
    })
    res.json(date)
}

module.exports = controllers;