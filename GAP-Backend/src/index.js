const express = require('express');
const user = require('./routes/user');
const empresa = require('./routes/empresa');
const tipoUsuario = require('./routes/tipoUsuario');
const datos = require('./routes/datos');
const datosEmpresas = require('./routes/datosEmpresa');
const GAP = require('./routes/GAP')
//Inicializacion
const app = express();


//Configuracion
app.set('port', process.env.POST || 3000);

//Middlewares
app.use(express.json());


app.use('/user', user);
app.use('/empresa', empresa);
app.use('/tipoUsuario', tipoUsuario);
app.use('/datos', datos);
app.use('/datosEmpresas', datosEmpresas);
app.use('/gap', GAP);
app.listen(app.get('port'), () => {
    console.log("Bienvenido estas en el puerto ", 3000)
})