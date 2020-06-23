const mongoose = require('mongoose')

const dbName =  'gymDB';
const url = 'mongodb://cliente:cliente@localhost:27017/' + dbName;

mongoose.connect(url, function(err){
    if(err)
        throw err;
    console.log("Conectado a la base de datos")
})

module.exports = mongoose;