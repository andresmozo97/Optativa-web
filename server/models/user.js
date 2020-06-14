const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var userSchema = new Schema({ // define a schema
    nombre: {type : String },
    apellido: {type : String },
    peso: {type : Number },
    dni: {type : Number },
    fechaInicio: {type : Date },
    clases: {type : [] },
    pagos: {type : [] }
});

module.exports = mongoose.model('User', userSchema)


