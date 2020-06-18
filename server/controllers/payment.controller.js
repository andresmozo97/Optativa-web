const Payment = require('../models/payment')

const paymentCtrl = {};

paymentCtrl.getPayment = function(req, res){
    if(req.params && req.params.payment_id){
        Payment.findPayment(req.params.payment_id, function(err, payment){
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
    Payment.findAllPayments(function(err, payments){
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
    if(req.body && req.body.new_payment){
            Payment.createPayment(req.body.new_payment, function(err, result){
                if (err)
                    res.json(400, err);
                else
                    res.json(201, result);
            })
    }else{
        res.json(400, {"message" : "no payment atts in body"})
    }
}

paymentCtrl.updatePayment = function(req, res){
    if(req.body && req.body.new_atts){
        if(req.params && req.params.payment_id){
            Payment.modifyPayment(req.params.payment_id, req.body.new_atts, function(err, result){
                if(err)
                    res.json(400, err);
                else
                    res.json(200, result);
            })
        }else{
            res.json(400, {"message": "No payment id in url"})
        }
    }else{
        res.json(400, {"message" : "No payment's new atts in body"})
    }
}

paymentCtrl.deletePayment = function(req, res){
    if(req.params && req.params.payment_id){
        Payment.deletePayment(req.params.payment_id, function(err, result){
            if(err)
                res.json(400, err)
            else
                res.json(204, result)
        })
    }else{
        res.json(400, {"message" : "No payment id in url"})
    }
}

module.exports = paymentCtrl;