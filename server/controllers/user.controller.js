const User = require("../models/user");

const userCtrl = {};

userCtrl.getAllUsers = function(req, res){ 
        User.findAllUsers(function(err, users){
            if(err){
                res.json(404, err);
            }else{
                if(!users){
                    res.json(404, {"message" : "No users found"});
                }else{
                    res.json(users);
                }
            }
        })
    }

userCtrl.getUser = function(req, res){
        if(req.params && req.params.dni){
            User.findPorDni(req.params.dni, function(err, user){
                if (err){
                    res.json(404, err); // si mongoose tira un error por algo, lo devuelvo como json
                    return;
                }else{
                    if(!user){
                        res.json(404, {"message": "User not found"});
                        return;
                    }else{
                        res.json(200, user); // retorno el user encontrado. 
                    }
                }
            })
        }else{ // si no hay parametros o no hay dni en los parametros
            res.json(404, {"message": "No dni in request"})
        }
    }


userCtrl.createUser = function(req, res){
    console.log("entro en Create user");
    console.log("req.body es " +req.body);
        if(req.body && req.body.new_user){
                User.createUser(req.body.new_user, function(err, result){
                    if (err)
                        res.json(400, err);
                    else
                        res.json(201, result);
                })
        }else{
            res.json(400, {"message" : "no user atts in body"})
        }
    }



userCtrl.updateUser = function(req, res){
        if(req.body && req.body.new_atts){
            if(req.params && req.params.dni){
                User.modifyPorDni(req.params.dni, req.body.new_atts, function(err, result){
                    if(err)
                        res.json(400, err);
                    else
                        res.json(200, result);
                })
            }else{
                res.json(400, {"message": "No dni in url"})
            }
        }else{
            res.json(400, {"message" : "No user's new atts in body"})
        }
    }


userCtrl.deleteUser = function(req, res){
        if(req.params && req.params.dni){
            User.deletePorDni(req.params.dni, function(err, result){
                if(err)
                    res.json(400, err)
                else
                    res.json(204, result)
            })
        }else{
            res.json(400, {"message" : "No dni in url"})
        }
    }

module.exports = userCtrl;

/*
userCtrl.getUsers = async function(req,res){
        const users = await User.find(); //lo q hace el async-await es decir bueno, este find va a tardar, asiq espera hasta q termine para hacer la sgte
        res.json(users);
}
*/


/*
userCtrl.getUser = async function(req,res){
        const user = await User.findById(req.params.id)
        res.json(user)
}
*/

/*
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
*/


/*
userCtrl.createUser = async function(req,res){
        jsonAux = req.body
        jsonAux.fechaInicio = new Date() //Tuvimos q hacer esto para agregarle el date, no se puede hacer new Date() en un JSON
       
        new_user = new User(jsonAux) 
        console.log("Va a agregar a este usuario")
        console.log(new_user)
        await new_user.save()
        res.json('Usuario creado')
}
*/

/*
userCtrl.deleteUser = async function(req,res){
        const { id } = req.params;
        await User.findByIdAndRemove(id) //si hay algun error podemos probar con findByIdAndDELETE
        res.json("Usuario eliminado")
}
*/