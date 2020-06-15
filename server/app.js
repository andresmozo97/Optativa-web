const express = require('express');
const mornpmgan = require('morgan')
var app = express(); //app es un servidor

const { mongoose } = require('./database') //Requiero mongoose de el archivo database.js (SOLO me interesa el mongoose(por eso los {})

//Settings
app.set('port', 4000)


//Middlewares
//CADA VEZ Q LLEGUE UNA PETICION, VA A USAR LOS MIDDLEWARES, SEA LA RUTA Q SEA
app.use(morgan('dev')) //C
app.use(express.json()); //Con esto hago q Express(el servidor) pueda entender el formato Json


//Routes
app.use(require('./routes/user.routes'))
app.use(require('./routes/payment.routes'))



//Starting the server
app.listen(app.get('port'), function () {
  console.log('Example app listening on PORT ' , app.get('port'));
});

/*
app.get('/', function (req, res) {
  res.send('HellooooOOO World!');
});



//Devolver un solo usuario
app.get('/user:id', function (req, res) {
  console.log(req.params)
  res.json(
    {
      nombre: "Tomi",
      apellido: "Castilla"
    }
  );
});

//Agregar usuario
app.post('/user:dni', function (req, res) {
  res.send('Post request received');
  console.log(req.body) //req body te permite tomar la info q el usuario te esta dando 
  console.log(req.params) //req.params se usa para leer el parametro q pongo al lado de /user
  
});

//Modificar usuario
app.put('/user', function (req, res) {
  res.send('Update request received');
});

//Borrar usuario
app.delete('/user/:dni', function (req, res) {
  console.log("va a borrar al usuario con el dni")
  console.log(req.params.dni)
  res.send("Usuario borrado");
});



*/