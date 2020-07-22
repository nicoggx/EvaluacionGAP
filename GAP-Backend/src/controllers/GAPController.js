const controllers = {}
var moment = require('moment');
var sequelize = require('./../model/database');
var Sequelize = require('sequelize')
const Op = Sequelize.Op
var xl = require('excel4node');
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
    
    var query = `SELECT g.idgap, g.nombreAnalisis, g.parametros, g.json, g.createdAt AS fecha_creacion,
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
    var resultado=[];

    const [results, metadata] = await sequelize.query(query)
        .then(([results, metadata]) => {
            resultado.push(results)
            return results;
        })
        .catch(error => {
            return error;
        })
        if(!results){
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

controllers.exportarGAP = async(req, res) => {
    var query = `SELECT g.idgap, g.nombreAnalisis, g.parametros, g.json, g.createdAt AS fecha_creacion,
    e.nombre_empresa, u.idusuario, u.email
    FROM gaps g 
    INNER JOIN usuarios AS u ON u.idusuario = g.idusuario
    INNER JOIN empresas AS e ON e.idempresa = u.idempresa
    WHERE true `
    
    if(req.params.idgap){
        query += ` AND g.idgap = ${req.params.idgap}`
    }
    query += ` ORDER BY g.createdAt ASC`
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
    if(results){
        // Create a new instance of a Workbook class
var wb = new xl.Workbook();
var nombreArchivo = 'EvaluacionGAP_'+moment()+'.xlsx';
// Add Worksheets to the workbook
var ws = wb.addWorksheet('Nivel 1');
 
// Create a reusable style
var style = wb.createStyle({
  font: {
    color: '#000000',
    size: 12,
  }
});
 
ws.cell(1, 1)
  .string('Nombre Analisis:')
  .style(style);
 
ws.cell(1, 2)
  .string(results.nombreAnalisis)
  .style(style);
 
  ws.cell(2, 1)
  .string('Fecha Analisis:')
  .style(style);
 var fecha = moment(results.fecha_creacion).format('DD-MM-YYYY');
ws.cell(2, 2)
  .string(fecha)
  .style(style);
 
  ws.cell(3, 1)
  .string('Dominio')
  .style(style);
  ws.cell(3, 2)
  .string('Checklist')
  .style(style);
  ws.cell(3, 3)
  .string('Total')
  .style(style);
  ws.cell(3, 4)
  .string('Porcentaje de Cumplimiento')
  .style(style);
  ws.cell(3, 5)
  .string('Porcentaje de No Cumplimiento')
  .style(style);
 var datos = []; 
 datos = JSON.parse(results.json);
 var fill = 4;
 var siguiente, actual;
 var arrCumpl = [];
 var arrnoCumpl = [];

 for(var i=0;i<datos.length;i++){
     if(i+1!==datos.length){
        if(actual!==siguiente){
            fill++
            ws.cell(fill-1, 1)
            .string('Porcentaje del dominio:')
            .style(style);
            let sum = arrCumpl.reduce((previous, current) => current += previous);
            var promCum = Math.round(sum / arrCumpl.length) + '%';
            ws.cell(fill-1, 4)
            .string(promCum)
            .style(style);

            let summ = arrnoCumpl.reduce((previous, current) => current += previous);
            var promCum = Math.round(summ / arrnoCumpl.length) + '%';
            ws.cell(fill-1, 5)
            .string(promCum)
            .style(style);
            fill++
            ws.cell(fill, 1)
            .string(datos[i].nombre)
            .style(style);
            var arrCumpl = [];
            var arrnoCumpl = [];
        }
        siguiente=datos[i+1].nombre;
        if(i===0){
            ws.cell(fill, 1)
            .string(datos[i].nombre)
            .style(style);
        }
     }
     var actual = datos[i].nombre;
  
  ws.cell(fill, 2)
  .string(datos[i].check)
  .style(style);
  ws.cell(fill, 3)
  .number(datos[i].total)
  .style(style);
  ws.cell(fill, 4)
  .string(datos[i].PorcentajeCumplido)
  .style(style);
  var prCum = datos[i].PorcentajeCumplido.substring(0, datos[i].PorcentajeCumplido.length-1); 
  arrCumpl.push(parseInt(prCum));
  ws.cell(fill, 5)
  .string(datos[i].PorcentajeNoCumplido)
  .style(style);
  var prNCum = datos[i].PorcentajeNoCumplido.substring(0, datos[i].PorcentajeNoCumplido.length-1); 
  arrnoCumpl.push(parseInt(prNCum));
  fill++

  if(i+1===datos.length){
    ws.cell(fill, 1)
    .string('Porcentaje del dominio:')
    .style(style);
    let sum = arrCumpl.reduce((previous, current) => current += previous);
    var promCum = Math.round(sum / arrCumpl.length) + '%';
    ws.cell(fill, 4)
    .string(promCum)
    .style(style);
    let summ = arrnoCumpl.reduce((previous, current) => current += previous);
    var promCum = Math.round(summ / arrnoCumpl.length) + '%';
    ws.cell(fill, 5)
    .string(promCum)
    .style(style);
  }
 }
wb.write(nombreArchivo, res);
    }else{
        res.json({
            res:'No hay datos para exportar'
        })
    }


};

module.exports = controllers;