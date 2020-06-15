const express = require('express')
const router = express.Router()

const payment = require('../controllers/payment.controller')

//Payments
router.get('/payments', payment.getAllPayments)
router.get('/payments/:payment_id', payment.getPayment)

module.exports = router