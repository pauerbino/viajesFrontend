'use strict';
angular.module('viajesApp')
  .controller('MisPaquetesCtrl', [ '$filter', '$location', '$scope', 'HotelService', 'CiudadService', 'PaqueteService', 'UserService', function ( $filter, $location, $scope, HotelService, CiudadService, PaqueteService, UserService) {

    $scope.hoteles = [];
    $scope.paquetes = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.misPaquetes = [];

    $scope.currentUser = {
        email : "",
        name : ""
    };

    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getMisPaquetes($scope.currentUser.email).then(function(response){
                $scope.misPaquetes = response;
                console.log(response);
            });         
        }
        else {
            //ACCESO PROHIBIDO
            console.log("aCCESO PROHIBIDO");
            $location.path('/busquedaAuto');
        }
    }

    initialize();

    $scope.verPaquete = function(idPaquete) {
        if (UserService.isLoggedIn()) {
            console.log("Ir al paquete");
            console.log(idPaquete);
            $location.path('/miPaquete/'+idPaquete);      
        }
        else {
            //ACCESO PROHIBIDO
            console.log("aCCESO PROHIBIDO");
            $location.path('/busquedaAuto');
        }
    };

  }]);
