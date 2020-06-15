const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// definimos el esquema de pagos.
var paymentSchema = new Schema({ // el _id no lo pongo porque ya lo asigna mongoose
    dni: {type : Number },
    fecha: {type : Date },
    clase :{type : String },
    monto: {type : Number },
});

//metodos
paymentSchema.statics.findPago = function (_id_pago , callback){
    return this.find( {_id : _id_pago}, callback)
}

paymentSchema.statics.findAll = function(cb){
    return this.find({}, cb);
}

paymentSchema.statics.modifyPago = function (_id_pago ,new_atts, callback){
    return this.findOneAndUpdate({id: _id_pago } ,{$set: new_atts}, callback)
}

paymentSchema.statics.deletePago = function (_id_pago , callback){
    return this.deleteMany( {_id : _id_pago }, callback)
}

module.exports = mongoose.model('Payment', paymentSchema);


