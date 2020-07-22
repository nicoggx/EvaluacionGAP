//importa la configuracion de la bd
var config =require( './Config');
//paquetes incial
const sql = require('mssql');
const express=require('express');
const app=express()
const cors=require('cors');
//configuracionconexion sql (cambiar a otro archivo)

var conexion = new sql.ConnectionPool(config);


//si no encuentra server que levante el 5005
app.set('port',process.env.PORT || 5002);

//carga de paquete de utilidad
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors())

//trabajo
app.post('/User',(req,res)=>{
    
    conexion.connect((err)=>{
        if(err) console.log(err);
        
        console.log(req.body);
        
        const {correo,contrasena}=req.body
        let sqlRequest= new sql.Request(conexion);
        let sqlQuery =
        `SELECT nombre_usuario,nombre_pais,correo_usuario FROM [calidaddatos].[dbo].[usuario]
        JOIN [calidaddatos].[dbo].[pais] On [calidaddatos].[dbo].[pais].id_pais=[calidaddatos].[dbo].[usuario].fk_pais
        where correo_usuario= '${correo}' AND PWDCOMPARE('${contrasena}', pass_usuario)= 1;`

      
        
        sqlRequest.query(sqlQuery,(err,data)=>{
            
            if(err)res.send(err);
            if(data.recordset[0]){
                res.json(data.recordset);
            }else{
                res.json("error")
            }
        });
        sql.close() 
    });
});

//Endpoint cambio de contraseña
app.post('/cambiarcontrasena',(req,res)=>{
    conexion.connect((err)=>{
        if(err) console.log(err);
        
        console.log(req.body);
        
        const {contrasena,nuevacontrasena,correo}=req.body
        let sqlRequest= new sql.Request(conexion);
        let sqlQuery =`UPDATE [calidaddatos].[dbo].[usuario]
        SET pass_usuario=PWDENCRYPT('${nuevacontrasena}')
        WHERE correo_usuario = '${correo}' AND PWDCOMPARE('${contrasena}', pass_usuario)= 1;`
        sqlRequest.query(sqlQuery,(err,data)=>{
            if(err)res.send(err);
            console.log(data);
            
            if(data.rowsAffected[0]){
                res.status(200).send("200")
            }else{
                res.status(400).send("400")
            }
        });
        sql.close() 
    });
});
//inicio server
app.listen(app.get('port'),()=>{
    console.log("running in 5002");
    
})
