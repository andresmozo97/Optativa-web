

var app = angular.module("GYM",[]); // creamos el modulo de la aplicacion
app.controller("GYM_controller", function($scope, $http){
    // las variables que le agreguemos a scope van a estar disponibles
    //en el codigo del html para poder referenciar con llaves
    const host = 'http://localhost:4000'
    $scope.edit_user_dni = -1;  //sirve para saber el dni del usuario que se esta editando y que si se
                                //llega a editar el dni, no se pierda el dni viejo

    $scope.users = [];          //arreglo de usuarios que contiene, luego del reresh(), todos los usuarios de la base
    
    $scope.user = {             //modelo para guardar los datos del usuario que se esta editando
        nombre : '',
        apellido : '',
        peso : '',
        dni : '',
        fechaInicio : '',
        clases : [],            //inicialmente comienza sin clases y sin pagos. Se agregan aparte
        pagos : []
    }
    $scope.propertyName = 'nombre'
    $scope.reverse = false;

    var refresh = function(){
        $http.get(host+'/users').then(function(response){
            console.log('Refresh OK', response);
            $scope.users = response.data;
        }
        , 
        function errorCallback(response){
            console.log('Bad Refresh', response);
        })
    }

    refresh();

    $scope.sortBy = function ( propertyName ) {
        console.log("entro al sort by con "+ propertyName)
        $scope.reverse = ( $scope.propertyName === propertyName ) ?
                                ! $scope.reverse : false;
                                $scope.propertyName = propertyName;
    };


    //addUser toma los datos de los campos de texto y agrega un usuario
    $scope.addUser = function () {
        $scope.user.fechaInicio = new Date();
        //console.log($scope.user.nombre);
        console.log('adding user...');
        $http.post(host + '/user', {
                     "new_user" : {
                         "nombre" : $scope.user.nombre,
                         "apellido" : $scope.user.apellido,
                         "peso": $scope.user.peso,
                         "dni": $scope.user.dni,
                         "clases": [],
                         "pagos": []
                     } })
        .then(function ( response ) {
            refresh () ; 
            console.log ("User added succesfully ", response );
        }, 
            function errorCallback ( response ) {
                console.log ("Bad ADD", response );
            }
        )
    }

    // update toma los datos de los campos de texto y los envia a la API
    $scope.update = function () {
            $http.put(host + '/user/' + $scope.edit_user_dni ,
            {
                "new_atts" : {
                    "dni": $scope.user.dni,
                    "nombre" : $scope.user.nombre,
                    "apellido" : $scope.user.apellido,
                    "peso": $scope.user.peso,
                }
            })
            .then ( function ( response ) {
                        refresh () ; 
                        console.log ("User updated sucessfully", response ) ;
                    }, 
                    function errorCallback ( response ) {
                        refresh () ; 
                        console.log ("BAD Update", response );
                    }
                );
        }

    // Delete se llama desde el boton eliminar que esta en cada fila de la tabla
    $scope.delete = function (id) {
        console.log (" Delete: ", id) ;
        $http.delete (host + '/user/' + id)
        .then ( function ( response ) {
            refresh () ; 
            console.log ("User deleted sucessfully", response ) ;
            }, 
            function errorCallback ( response ) {
                console.log ("BAD delete", response );
            }
        );
    }

    //Edit llena los campos de texto para editar el usuario
    $scope.edit = function (id){
        console.log("el id es " +id)
        $scope.edit_user_dni = id;
        $http.get(host + '/user/' + $scope.edit_user_dni)
        .then ( function ( response ) {
                    $scope.user = response.data;
                    console.log ("OK Edit RD: ", response.data ) ;
                    }, 
                    function errorCallback ( response ) {
                        console.log (" Bad edit !!", response ) ; 
                    }
            );
    }

        
    // deselect deja en blanco los campos de texto
    $scope.deselect = function () {
            console.log("entro al deselect");
            $scope.user = ({}) ; 
        }      

});