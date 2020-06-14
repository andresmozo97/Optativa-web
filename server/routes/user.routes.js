const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller')



router.get('/users', user.getUsers)
router.get('/user:dni' , user.getUser)
/*
router.post('/user', user.createUser)

router.put('/user:dni' , user.updateUser )

router.delete('/user:dni',user.deleteUser)

*/
module.exports = router