const user = require("../models/user");

const userCtrl = {};

user.userCtrl.getUsers = function(req,res){
        res.json({
            status: "rest api funcionando"   
        })
    }


user.userCtrl.getUser = function(){

}

user.userCtrl.updateUser = function(){

}

user.userCtrl.deleteUser = function(){

}


module.exports = userCtrl;