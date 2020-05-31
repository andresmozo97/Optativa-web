const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Connection URL
const dbName =  'gymDB';
const url = 'mongodb://cliente:cliente@localhost:27017/' + dbName; //aca va el usuario:password de la base de datos (lo que creamos antes)

// Create a new MongoClient
console.log("construyendo cliente");
const client = new MongoClient(url, {useUnifiedTopology : true} );  // el segundo parametro me lo pide la consola porque hay algo deprecado
console.log("cliente creado, conectando...");

var userSchema = new Schema({ // define a schema
    nombre: String,
    apellido: String,
    peso: Number,
    dni: Number,
    fechaInicio: Date,
    clases: [],
    pagos: []
    });

var userModel = mongoose.model('User', userSchema);
// create a document
var user_new = new userModel({
    nombre: 'Lionel',
    apellido: 'Messi',
    peso: '10',
    dni: '1010101010',
    fechaInicio: new Date(),
    clases: ['Futbol'],
    pagos: [10,100,1000]
});

mongoose.connect(url, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
    user_new.save(function (err) {
        if (err) { console.log(err); } else {
            console.log('Agrego al usuario correctamente');
            mongoose.connection.close();
        }
    });
});

/*
//Create Read Update Delete (en user)
//create
const createUser = function(db,newUser,callback){
    const users = db.collection('users');
    users.insertOne(newUser, function(err, result){
        assert.equal(err, null);
        assert.equal(result.insertedCount, 1);
        console.log("User added succesfully");
        callback(result);
    });  
}
//read
const findUsers = function(db, callback){
    const collection_usuarios = db.collection('users');
    //aca en el find podriamos poner el criterio de busqueda, que se pase por parametros
    collection_usuarios.find({}).toArray(function(err, elementos){ 
        assert.equal(err, null);
        console.log(elementos);
        callback(elementos);
    })
}

const findUser = function(db,criterioBusqueda, callback){
    const collection_usuarios = db.collection('users');
    collection_usuarios.find(criterioBusqueda).toArray(function(err, elementos){ 
        assert.equal(err, null);
        console.log(elementos);
        callback(elementos);
    })
}

const findGeneric = function(db,nombreColeccion,criterioBusqueda, callback){
    const collection = db.collection(nombreColeccion);
    collection.find(criterioBusqueda).toArray(function(err, elementos){ 
        assert.equal(err, null);
        console.log(elementos);
        callback(elementos);
    })
}

//update
//newAtts serian los atributos nuevos, y updateAtts aquellos por los que se encuentra la(s) tupla(s) que se actualizaran.
const updateUser = function(db, newAtts, updateCriteria, callback) {
    const users = db.collection('users');
    users.updateMany(updateCriteria, {$set: newAtts}, function(err, result){
        assert.equal(err, null);
        console.log(result.modifiedCount + " document(s) updated");
        callback(result);
    })
}

//delete

const deleteUser = function(db, deleteCriteria, callback){
    const users = db.collection('users');
    users.deleteMany(deleteCriteria, function(err, result){
        assert.equal(err, null);
        console.log(result.deletedCount + "documents deleted");
        callback(result);
    })
}


const user_new = {
    nombre: 'Andrelo',
    apellido: 'Mozo',
    peso: '10',
    dni: '12323321',
    fechaInicio: new Date(),
    clases: ['Musculacion'],
    pagos: [7,9,12]
}

let user_new_2 = {
    nombre: 'Tomas',
    apellido: 'Castilla',
    peso: '10',
    dni: '666999',
    fechaInicio: new Date(),
    clases: ['Musculacion', 'Crossfit'],
    pagos: [4,8,29]
}

let criterioTomas ={nombre: "Tomas"} 

let criterioAndrelo = { nombre: "Andrelo"
}
let criterioAndres = { nombre: "Andres" }

const nuevosValores = {nombre: 'Andres'};
const criterioUpdate = {nombre: 'Andrelo'};

//Ahora operamos sobre la coleccion de pagos

let user_new_3 = {
    nombre: 'Juan',
    apellido: 'Gonzalez',
    peso: '10',
    dni: '246',
    fechaInicio: new Date(),
    clases: ['Pilates'],
    pagos: [56]
}

let pay_new = {
    id_pago: 443,
    dni: "246",
    fecha: new Date(),
    clase :"Pilates",
    monto: 500
}


const insertPayment = function(db,newPayment,callback){
    const payments = db.collection('payments');
    payments.insertOne(newPayment, function(err, result){
        assert.equal(err, null);
        assert.equal(result.insertedCount, 1);
        console.log("Payments added succesfully");
        
        //Ahora agregamos el pago al usuario
        const users = db.collection('users');
        users.updateOne({ dni : newPayment.dni} , {$push: {pagos: newPayment.id_pago}},function(err, result){
            assert.equal(err, null);
            console.log(result.modifiedCount + " document(s) updated");
            callback(result);
        })
      //  callback(result); //CREO Q ESTA NO VA
    });  
}


// Use connect method to connect to the Server
client.connect(function (err) {
    console.log("antes del assertion");
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    createUser(db, user_new, function(){
        createUser(db,user_new_2,function(){
            findUsers(db, function(){
                console.log("Ahora utilizamos el find con un criterio por parametro")
                findUser(db,criterioTomas,function(){
                    console.log("Ahora buscamos a tomas con el find generico")
                    findGeneric(db,"users",criterioTomas,function(){
                        console.log("Ahora probamos el update sobre andrelo para cambiarlo a andres")
                        updateUser(db,nuevosValores,criterioUpdate,function(){
                            console.log("Ahora eliminamos a Andres")
                            deleteUser(db,criterioAndres,function(){
                                console.log("Probamos la adicion de pagos")
                                createUser(db,user_new_3, function(){
                                    insertPayment(db,pay_new,function(){
                                        client.close();
                                    })
                                }) 
                            })
                        })
                        
                    })
                })
            })
        })
    })
    
});
*/