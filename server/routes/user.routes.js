const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller')


//Users
//Create 
router.post('/user', user.createUser)

//Read
router.get('/users', user.getAllUsers)
router.get('/user/:dni' , user.getUser)

//Update
router.put('/user/:dni' , user.updateUser )

//Delete
router.delete('/user/:dni',user.deleteUser)


module.exports = router