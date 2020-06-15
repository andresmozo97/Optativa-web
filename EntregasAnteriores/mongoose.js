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
    pagos: {type : [Schema.Types.ObjectId] }
    });

var paymentSchema = new Schema({ // el _id no lo pongo porque ya lo asigna mongoose
    dni: {type : Number },
    fecha: {type : Date },
    clase :{type : String },
    monto: {type : Number },
})

//Declaramos las queries y las funciones para los usuarios

userSchema.query.porNombre = function(name) {
    return this.where({ nombre: new RegExp(name, 'i') });
};

userSchema.statics.findPorNombre = function (name , callback){
    return this.find( {nombre: new RegExp(name, 'i') }, callback) 
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
    return this.find( {_id : _id_pago}, callback)
}

paymentSchema.statics.findAll = function(cb){
    return this.find({}, cb);
}

paymentSchema.statics.ModifyPago = function (_id_pago ,new_atts, callback){
    return this.findOneAndUpdate({id: _id_pago } ,{$set: new_atts}, callback)
}

paymentSchema.statics.deletePago = function (_id_pago , callback){
    return this.deleteMany( {_id : _id_pago }, callback)
}


//Modelamos los esquemas
var User = mongoose.model('User', userSchema);
var Payment = mongoose.model('Payment' , paymentSchema)

//Usuarios
//Hay que crear las variables DESPUES de declarar los modelos
var new_user1 = new User({
    nombre: 'Lionel',
    apellido: 'Messi',
    peso: '10',
    dni: '10101010',
    fechaInicio: new Date(),
    clases: ['Futbol'],
    pagos: ['5ee695161287a302e8215bb7','5ee695161287a302e8215bb7','5ee695161287a302e8215bb7']
});

var new_user2 = new User({
    nombre: 'Michael',
    apellido: 'Jordan',
    peso: '23',
    dni: '23232323',
    fechaInicio: new Date(),
    clases: ['Basket'],
    pagos: ['5ee695161287a302e8215bb7','5ee695161287a302e8215bb7','5ee695161287a302e8215bb7']
});

var new_user3 = new User({
    nombre: 'Roger',
    apellido: 'Federer',
    peso: '80',
    dni: '80808080',
    fechaInicio: new Date(),
    clases: ['Tenis'],
    pagos: ['5ee69e1ebe94c703fa4c4a0e','5ee69bf49e063603ce05212c','5ee695161287a302e8215bb7']
});

//Pagos
var pay_new = new Payment({
    //_id: 532,
    dni: 80808080,
    fecha: new Date(),
    clase :"Pilates",
    monto: 500
})

const nuevosValores = {nombre: 'Roman'};


mongoose.connect(url, function(err){
    if(err) throw err;
    console.log("connected!");
    pay_new.save(function(err){
        if(err) throw err;
        console.log("new payment saved");
        Payment.findAll(function(err, res){
            if (err) throw err;
            console.log(res);
            new_user3.save(function(err){
                if(err) throw err;
                console.log('new user saved');
                Payment.findPago(new_user3['pagos'][0], function(err, res){
                    if(err) throw err;
                    console.log('payment:\n', res);
                    mongoose.connection.close();
                })
            })
        })
    })
});

// mongoose.connect(url, function (err) {
//     if (err) throw err;
//     console.log("Successfully connected ");
//     new_user1.save(function (err) {
//         if (err) console.log(err);
//         else {
//             console.log("Agrego al usuario correctamente");
//             new_user2.save(function (err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     User.find().porNombre("Lionel").exec(function(err, usuarios) {
//                         console.log(usuarios);
//                         User.findPorNombre('Tomas', function (err, usuarios) {
//                             console.log(usuarios);
//                             User.modifyPorDni(10101010,nuevosValores,function(err,user){
//                                 console.log(user);
//                                 User.findPorNombre('Roman', function (err, usuarios){
//                                     console.log("Entro a ver si lo modifico por roman");
//                                     console.log(usuarios);
//                                     User.deletePorDni(10101010,function(err,result){
//                                         console.log("Entro a borrar")
//                                         console.log(result)
//                                         pay_new.save(function(err,result){
//                                             if (err)
//                                                 console.log(err)
//                                             else{
//                                                 console.log("Agrego al PAGO correctamentes")
//                                                 console.log(result)
//                                                 Payment.findPago('5ee695161287a302e8215bb7', function(err,pay){
//                                                     if (err)
//                                                         console.log(err)
//                                                     else{
//                                                         console.log("Encontro con el find Pago")
//                                                         console.log(pay)
//                                                         Payment.deletePago('5ee695161287a302e8215bb7', function(err,pay){
//                                                             if (err)
//                                                                 console.log(err)
//                                                             else
//                                                                 console.log("Elimino los pago")
//                                                                 console.log(pay)
//                                                                 mongoose.connection.close();
//                                                         })
//                                                     }
//                                                 })
//                                             }
//                                         })

//                                     })
//                                 });                               
                        
//                             });
//                         });

//                     });
//                 }
//             });
//         }
//     })
// })