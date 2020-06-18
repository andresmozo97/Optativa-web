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
paymentSchema.statics.findPayment = function (_id_pago , callback){
    return this.findOne( {_id : _id_pago}, callback)
}

paymentSchema.statics.findAllPayments = function(cb){
    return this.find({}, cb);
}

paymentSchema.statics.modifyPayment = function (_id_pago ,new_atts, callback){
    return this.findOneAndUpdate({_id: _id_pago} ,{$set: new_atts}, callback)
}

paymentSchema.statics.deletePayment = function (_id_pago , callback){
    return this.deleteMany( {_id : _id_pago }, callback)
}

paymentSchema.statics.createPayment = function(payment_atts, callback){
    const Payment = mongoose.model('Payment', paymentSchema)
    var new_payment = new Payment(payment_atts);
    new_payment.save(callback);
}

module.exports = mongoose.model('Payment', paymentSchema);


