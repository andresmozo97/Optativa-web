

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
    
    $scope.addUser = function(){
        console.log('adding user...');
    }

});