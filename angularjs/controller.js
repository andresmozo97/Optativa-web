

var app = angular.module("GYM",[]); // creamos el modulo de la aplicacion
app.controller("GYM_controller", function($scope, $http){
    // las variables que le agreguemos a scope van a estar disponibles
    //en el codigo del html para poder referenciar con llaves
    const host = 'http://localhost:4000'
    $scope.users = [];
    $scope.user = {
        nombre : '',
        apellido : '',
        peso : '',
        dni : '',
        fechaInicio : '',
        clases : [],
        pagos : []
    }

    var refresh = function(){
        $http.get(host+'/users').then(function(response){
            console.log('ok', response);
            $scope.users = response.data;
        }
        , 
        function errorCallback(response){
            console.log('bad', response);
        })
    }

    refresh();

    $scope.propertyName = 'nombre'
    $scope.reverse = false;

    $scope.sortBy = function ( propertyName ) {
        console.log("entro al sort by con "+ propertyName)
        $scope.reverse = ( $scope.propertyName === propertyName ) ?
                                ! $scope.reverse : false;
                                $scope.propertyName = propertyName;
    };


    //addUser toma los datos de los campos de texto y agrega un usuario
    $scope.addUser = function () {
        console.log ( $scope.user );
        console.log('adding user...');
        //$http.post(host + '/user', $scope.user )
        $http({
            method: 'post',
            url: host + '/user',
            body: {
                new_user:$scope.user
            }
          })
        .then ( function ( response ) {
                    refresh () ; 
                    console.log ("Ok ADD ", response );
                    }, 
                function errorCallback ( response ) {
                    console.log (" Bad ADD ", response );
                }
            );
    }

    // update toma los datos de los campos de texto y los envia a la API
    $scope.update = 
        function () {
            $http.put(host + '/user/' + $scope.dni ,$scope.user)
            .then ( function ( response ) {
                        refresh () ; 
                        console.log ("OK Update ", response ) ;
                    }, 
                    function errorCallback ( response ) {
                        refresh () ; 
                        console.log (" BAD Update !!", response );
                    }
                );
        }

    // Delete se llama desde el boton eliminar que esta en cada fila de la tabla
    $scope.delete = function (id) {
        console.log (" Delete: ", id) ;
        $http.delete (host + '/user/' + id)
        .then ( function ( response ) {
            refresh () ; 
            console.log ("Ok delete ", response ) ;
            }, 
            function errorCallback ( response ) {
                console.log (" BAD delete !!", response );
            }
        );
    }

    //Edit llena los campos de texto para editar el usuario
    $scope.edit = function (id){
        console.log("el id es " +id)
        $http.get(host + '/user/' + id)
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
    $scope.deselect = 
        function () {
            console.log("entro al deselect");
            $scope.user = ({}) ; 
        }      

});