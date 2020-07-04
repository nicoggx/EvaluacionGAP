const express = require('express');
const user = require('./routes/user');
const empresa = require('./routes/empresa');
//Inicializacion
const app = express();


//Configuracion
app.set('port', process.env.POST || 3000);

//Middlewares
app.use(express.json());


app.use('/user', user);
app.use('/empresa', empresa);

app.listen(app.get('port'), () => {
    console.log("Bienvenido")
})