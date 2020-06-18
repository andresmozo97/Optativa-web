const express = require('express')
const router = express.Router()

const payment = require('../controllers/payment.controller')

//Payments
router.get('/payments', payment.getAllPayments)
router.get('/payments/:payment_id', payment.getPayment)
router.post('/payments', payment.createPayment)
router.put('/payments/:payment_id', payment.updatePayment)
router.delete('/payments/:payment_id', payment.deletePayment)

module.exports = router