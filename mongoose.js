const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Connection URL
const dbName =  'gymDB';
const url = 'mongodb://cliente:cliente@localhost:27017/' + dbName; //aca va el usuario:password de la base de datos (lo que creamos antes)

// Create a new MongoClient
const client = new MongoClient(url, {useUnifiedTopology : true} );  // el segundo parametro me lo pide la consola porque hay algo deprecado
console.log("cliente creado,  conectando...");

//Declaramos los esquemas
var userSchema = new Schema({ // define a schema
    nombre: {type : String },
    apellido: {type : String },
    peso: {type : Number },
    dni: {type : Number },
    fechaInicio: {type : Date },
    clases: {type : [] },
    pagos: {type : [] }
    });

var paymentSchema = new Schema({
    id_pago: {type : Number },
    dni: {type : Number },
    fecha: {type : Date },
    clase :{type : String },
    monto: {type : Number },
})

//Declaramos las queris y las funciones para los usuarios

userSchema.query.porNombre = function(name) {
    return this.where({ nombre: new RegExp(name, 'i') });
};

userSchema.statics.findPorNombre = function (name , callback){
    return this.find( {nombre: new RegExp(name, 'i') }, callback) //VER BIEN Q ES ESTO DE RegExp
}

userSchema.statics.deletePorDni = function (_dni , callback){
    console.log(_dni)
    return this.deleteMany({ dni:_dni }, callback)
}

userSchema.statics.modifyPorDni = function (_dni , new_atts, callback){
    return this.findOneAndUpdate({dni: _dni } ,{$set: new_atts}, callback) //busca por dni y actualiza el att por new_value 
}


//Declaramos las funciones para el esquema payment
paymentSchema.statics.findPago = function (_id_pago , callback){
    return this.find( {id : _id_pago }, callback)
}

paymentSchema.statics.ModifyPago = function (_id_pago ,new_atts, callback){
    return this.findOneAndUpdate({id: _id_pago } ,{$set: new_atts}, callback)
}

paymentSchema.statics.deletePago = function (_id_pago , callback){
    return this.deleteMany( {id_pago : _id_pago }, callback)
}


//Modelamos los esquemas
var User = mongoose.model('User', userSchema);
var Payment = mongoose.model('Payment' , paymentSchema)

//Usuarios
var new_user1 = new User({
    nombre: 'Lionel',
    apellido: 'Messi',
    peso: '10',
    dni: '10101010',
    fechaInicio: new Date(),
    clases: ['Futbol'],
    pagos: [10,100,1000]
});

var new_user2 = new User({
    nombre: 'Michael',
    apellido: 'Jordan',
    peso: '23',
    dni: '23232323',
    fechaInicio: new Date(),
    clases: ['Basket'],
    pagos: [23,2323,23000]
});

var new_user3 = new User({
    nombre: 'Roger',
    apellido: 'Federer',
    peso: '80',
    dni: '80808080',
    fechaInicio: new Date(),
    clases: ['Tenis'],
    pagos: [80,8080,80000]
});

//Pagos
var pay_new = new Payment({
    id_pago: 443,
    dni: "246",
    fecha: new Date(),
    clase :"Pilates",
    monto: 500
})



const nuevosValores = {nombre: 'Roman'};


mongoose.connect(url, function (err) {
    if (err) throw err;
    console.log("Successfully connected ");
    new_user1.save(function (err) {
        if (err) console.log(err);
        else {
            console.log("Agrego al usuario correctamente");
            new_user2.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    User.find().porNombre("Lionel").exec(function(err, usuarios) {
                        console.log(usuarios);
                        User.findPorNombre('Tomas', function (err, usuarios) {
                            console.log(usuarios);
                            User.modifyPorDni(10101010,nuevosValores,function(err,user){
                                console.log(user);
                                User.findPorNombre('Roman', function (err, usuarios){
                                    console.log("Entro a ver si lo modifico por roman");
                                    console.log(usuarios);
                                    User.deletePorDni(10101010,function(err,result){
                                        console.log("Entro a borrar")
                                        console.log(result)
                                        mongoose.connection.close();

                                    })
                                });                               
                        
                            });
                        });

                    });
                }
            });
        }
    })
})