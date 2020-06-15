const Payment = require('../models/payment')

const paymentCtrl = {};

paymentCtrl.getPayment = function(req, res){
    if(req.params && req.params.id){
        Payment.findPago(req.params.id, function(err, payment){
            if (err){
                res.json(404, err); // si mongoose tira un error por algo, lo devuelvo como json
                return;
            }else{
                if(!payment){
                    res.json(404, {"message": "Payment not found"});
                    return;
                }else{
                    res.json(200, payment); // retorno el payment encontrado. 
                }
            }
        })
    }else{ // si no hay parametros o no hay payment_id en los parametros
        res.json(404, {"message": "No payment_id in request"})
    }
}

paymentCtrl.getAllPayments = function(req, res){ // esto deberiamos hacerlo con un offset porque puede ser que sean muchos y por ahi la cagamos llenando la memoria del cliente 
    Payment.findAll(function(err, payments){
        if(err){
            res.json(404, err);
        }else{
            if(!payments){
                res.json(404, {"message" : "No payments found"});
            }else{
                res.json(payments);
            }
        }
    })
}

paymentCtrl.createPayment = function(req, res){

}

paymentCtrl.updatePayment = function(req, res){

}

paymentCtrl.deletePayment = function(req, res){

}

module.exports = paymentCtrl;