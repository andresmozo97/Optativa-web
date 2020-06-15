const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller')


//Users
//Create 
router.post('/user', user.createUser)

//Read
router.get('/users', user.getUsers)
router.get('/user/:id' , user.getUser)

//Update
router.put('/user/:id' , user.updateUser )

//Delete
router.delete('/user/:id',user.deleteUser)


module.exports = router