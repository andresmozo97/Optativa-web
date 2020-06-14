Less code than NodeJS for Web apps:
 
//Esto es un servidor hecho en NodeJS
var http = require("http"); //Usa una biblioteca de http

http.createServer(function(request, response) { //le pasa una funcion q es la q se llama cuando se recibe un reqrimiento del navegador
        //En el request viene los datos q pide el navegador, en el response lo q debe mostrar el navegador
response.writeHead(200, {"Content-Type": "text/plain"}); //200 signfica que esta bien, 400 seria error. Dsp le indico q estoy generando contenido en formato de texto plano
response.write("Hello World"); //Escribo lo q realmente va a mostrar el navegador
response.end();
}).listen(3000); //el servidor este va a estar escuchando pedidos http en el puerto 3000
console.log("Server running on http://localhost:3000");
//Todo esto funciona en un hilo no bloqueante (tiene la capacidad de atender a "muchos clientes a la vez")

////////////////////////////////////////////////////////////////
Less code than NodeJS for Web apps:
//Esto es hecho con express

//Para hacer esto debo instalar a express (Comandos sgte filmina)
var express = require("express"); //Vamos a usar la biblioteca express
var app = express(); //starts up your app //Inicializa el servidor

//Ahora asocio al metodo http get, un path "/"
app.get("/",function(req,res){ //Asocio al path "/" una funcion que va a responder Hello World 
res.send("Hello world"); //Se elimina todo lo q es el manejo de codigo de error y el content type
});
app.listen(3000); //Indico q va a funcion en el puerto 3000
console.log("Server started on http://localhost:3000");



////////////////////////////////////////////////////////////////

npm init
npm install express --save

////////////////////////////////////////////////////////////////
By HTTP method:
– expressApp.get(urlPath, requestProcessFunction);
– expressApp.post(urlPath, requestProcessFunction);
– expressApp.put(urlPath, requestProcessFunction);
– expressApp.delete(urlPath, requestProcessFunction);
– expressApp.all(urlPath, requestProcessFunction); //Indepentiendtemente de si es un get,post,put,delete, para este path ahce esta funcion


////////////////////////////////////////////////////////////////
expressApp.get('/user/:user_id', function(httpRequest,
httpResponse) ...: //A esta ruta, la definiimos nosotros, no tiene q existir si o si

• request.params - Object containing url route params
(e.g. user_id) 
• request.query - Object containing query params
– http://localhost?foo=9 {foo: '9'} ⇒ //Los params pueden venir en la uri 
• request.body - Object containing the parsed body //Es medio raro q lo usemos por ahora
• request.get(field) - Return the value of the specified
HTTP header field

//////////////////////////////////
expressApp.get('/user/:user_id', function(httpRequest,
    httpResponse) ...: //Gralmente el request va a ser .html pero podria ser un gif, o otras cosas
    
    • response.write(content) - Build up the response body with content
    • response.status(code) - Set the HTTP status code of the reply
    • response.set(prop, value) - Set the response header property to
    value
    • response.end() - End the request by responding to it //Indica q todo eso se envie al cliente
    • response.end(msg) - End the request by responding with msg
    • response.send(content) - Do a write and send
    Methods returns the response object so they stack:
    • response.status(code).write(content1).write(content2).end(); //Se pueden poner todas las lineas juntas
    
    

///////////////////////////////////////
//Middleware
//Express me permite manejar la navegacion entre paginas 
//La funcion next() me va a hacer saltar a ciertas cosas
Examples:
– Check to see if user is logged in, otherwise
send error response and don't call next()
– Parse the request body as JSON and attach
the object to request.body and call next()
– Session and cookie management,
compression, encryption, etc.

///////////////////////////////Middleware: An example

var express = require('express');
var app = express();

var myLogger = function (req, res, next) { //las funciones middleware tienen 3 parametros. Next es adonde voy a saltar
console.log('Logged:', Date.now()); //Se invoco este metodo a esta hora
next(); //Cada pedido que viene
};

app.use(myLogger); //Agrego funcionalidad usando middleware

app.get('/', function (req, res) {
res.send('Hello World!');
});

app.listen(3000);


//////////////////////////////////////Middleware 
Give other software the ability to interpose on requests

expressApp.all(urlPath, function (request, response,
next) {
// Do whatever processing on request (or setting response)
next(); // pass control to the next handler
});

● Interposing on all request using the route mechanism
expressApp.use(function (request, response, next) {...}); //Con el use lo asocio



//////////////////////////////////////////// A simple web server
var express = require('express');
var app = express(); // Creating an Express "App"

app.use(express.static(__dirname)); // Adding middleware
//Designar cierto path de mi servidor con un directorio para entregar archivos estaticos

app.get('/', function (request, response) {
// A simple request handler
response.send('Simple web server of files from ' + __dirname);
});
app.listen(3000, function () {
// Start Express on the requests
console.log('Listening at http://localhost:3000 exporting the directory
' +
__dirname);
});

///////////////////////////////////////////

app.use(express.static(__dirname));


///////////////////////////////////////////////Fetch from a JSON file

//Aca en vez de obtener un archivo estatico y recodificarlo tal cual esta,
//... lo vamos a recodificar a otra cosa
var fs = require('fs');
expressApp.get("/object/:objid", function (request, response) {
var dbFile = "DB" + request.params.objid; //Toma el parametro obj id y forma un string

//Obtenemos la query de un archivo
fs.readFile(dbFile, function (error, contents) { //Intenta leer el archivo
if (error) {
response.status(500).send(error.message);
} else { //Si no da error, parsea el json (antes era un objeto de tipo buffer)
var obj = JSON.parse(contents); // JSON.parse accepts Buffer types
obj.date = new Date();
response.set('Content-Type', 'application/json'); // Same as res.json(obj); //Por ej el resultado de las BD los vamos a dar como json
response.status(200).send(JSON.stringify(obj));//lo pasamos como un string para pasarlo por la red
}
});
Note: Make sure you always call end() or send()
});



////////////////////////////////
Agregar ejemplos de ?name //Esto es para el ejemplo q nos dieron de el json ese largo
• Agregar ejemplos de body con JSON usando
bodyparser



//////////////////////////////////////////Exercises
print debugging information about different
requests:
– ?name=
– ?name=...?address=...
• connect MongoDB to express and
– answer an http query by accessing the database
previously created
• https://expressjs.com/es/ 

/////////////////////////////////////////
