'use strict';
angular.module('viajesApp')
  .controller('UsuariosCtrl', [ '$location', '$scope', 'UserService', function ( $location, $scope, UserService) {

    $scope.usuarios = [];

    $scope.currentUser = {
        email : "",
        name : ""
    };

    function initialize() {
        $scope.usuarios = [];
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            if ($scope.currentUser.email === "admin@hotmail.com") {
                UserService.getUsers().then(function(response){
                    for (var i = 0; i < response.length; i++) {
                        if(response[i].email !== "admin@hotmail.com"){
                            $scope.usuarios.push(response[i]);
                        }
                    }
                    console.log(response);
                });         
            }
            else {
                console.log("aCCESO PROHIBIDO");
                $location.path('/busquedaAuto');
            }
        }
        else {
            //ACCESO PROHIBIDO
            console.log("aCCESO PROHIBIDO");
            $location.path('/busquedaAuto');
        }
    }

    initialize();

    $scope.borrarUsuario = function(idUsuario) {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            if ($scope.currentUser.email === "admin@hotmail.com") {
                UserService.deleteUser(idUsuario).then(function(){
                    initialize();
                });         
            }
            else {
                console.log("aCCESO PROHIBIDO");
                $location.path('/busquedaAuto');
            }    
        }
        else {
            //ACCESO PROHIBIDO
            console.log("aCCESO PROHIBIDO");
            $location.path('/busquedaAuto');
        }
    };

  }]);
