const User = require("../models/user");


const userCtrl = {};

userCtrl.getUsers = async function(req,res){
        const users = await User.find(); //lo q hace el async-await es decir bueno, este find va a tardar, asiq espera hasta q termine para hacer la sgte
        res.json(users);
}


userCtrl.getUser = function(){

}

userCtrl.updateUser = function(){

}

userCtrl.deleteUser = function(){

}


module.exports = userCtrl;