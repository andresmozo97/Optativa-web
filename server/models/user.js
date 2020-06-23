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

//Funciones para los usuarios

userSchema.statics.findPorDni = function (_dni , callback){
    return this.findOne( {dni : _dni} , callback) 
}

userSchema.statics.findAllUsers = function(cb){
    return this.find({}, cb);
}

userSchema.statics.modifyPorDni = function (_dni , new_atts, callback){
    return this.findOneAndUpdate({dni: _dni } ,{$set: new_atts}, callback) //busca por dni y actualiza el att por new_value 
}

userSchema.statics.deletePorDni = function (_dni , callback){
    return this.deleteMany({ dni:_dni }, callback)
}

userSchema.statics.createUser = function(user_atts, callback){
    const User = mongoose.model('User', userSchema)
    var new_user = new User(user_atts);
    new_user.save(callback);
}

module.exports = mongoose.model('User', userSchema)


