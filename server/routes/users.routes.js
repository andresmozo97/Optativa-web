const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller')



router.get('/users', user.getUsers())


module.exports = router