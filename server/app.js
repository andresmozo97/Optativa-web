const express = require('express');
const morgan = require('morgan')
var app = express(); //app es un servidor

const { mongoose } = require('./database') //Requiero mongoose de el archivo database.js (SOLO me interesa el mongoose(por eso los {})

//Settings
app.set('port', 4000)


//Middlewares
//CADA VEZ Q LLEGUE UNA PETICION, VA A USAR LOS MIDDLEWARES, SEA LA RUTA QUE SEA
app.use(morgan('dev')) 
app.use(express.json()); //Con esto hacemos que Express(el servidor) pueda entender el formato Json


//Routes
app.use(require('./routes/user.routes'))
app.use(require('./routes/payment.routes'))


//Starting the server
app.listen(app.get('port'), function () {
  console.log('Example app listening on PORT ' , app.get('port'));
});