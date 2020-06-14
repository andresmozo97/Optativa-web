const User = require("../models/user");
const user = require("../models/user");


const userCtrl = {};

userCtrl.getUsers = async function(req,res){
        const users = await User.find(); //lo q hace el async-await es decir bueno, este find va a tardar, asiq espera hasta q termine para hacer la sgte
        res.json(users);
}


userCtrl.getUser = async function(req,res){
        const user = await User.findById(req.params.id)
        res.json(user)
}

userCtrl.createUser = async function(req,res){
        jsonAux = req.body
        jsonAux.fechaInicio = new Date() //Tuvimos q hacer esto para agregarle el date, no se puede hacer new Date() en un JSON
       
        new_user = new User(jsonAux) 
        console.log("Va a agregar a este usuario")
        console.log(new_user)
        await new_user.save()
        res.json('Usuario creado')
}

userCtrl.updateUser = async function(req,res){
        const { id } = req.params;
        const userUpdated = {
                nombre: req.body.nombre,
                apellido:req.body.apellido ,
                peso: req.body.peso,
                dni: req.body.dni,
                clases: req.body.clases,
                pagos: req.body.pagos
        }
        userUpdated.fechaInicio = new Date();
        await User.findByIdAndUpdate(id, { $set: userUpdated} , {new:true}) //El new:true es para q si no existe, q lo cree
        res.json("Usuario modificado")
}

userCtrl.deleteUser = async function(req,res){
        const { id } = req.params;
        await User.findByIdAndRemove(id) //si hay algun error podemos probar con findByIdAndDELETE
        res.json("Usuario eliminado")
}


module.exports = userCtrl;