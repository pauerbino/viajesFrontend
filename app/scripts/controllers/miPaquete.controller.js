'use strict';
angular.module('viajesApp')
  .controller('MiPaqueteCtrl', [ '$filter', '$location', '$routeParams', '$scope', 'HotelService', 'CiudadService', 'PaqueteService', 'UserService', function ( $filter, $location,  $routeParams, $scope, HotelService, CiudadService, PaqueteService, UserService) {

    $scope.hoteles = [];
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.idPaquete = $routeParams.idPaquete;
    $scope.paquete = null;

    $scope.currentUser = {
        email : "",
        name : ""
    };

    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            console.log($scope.idPaquete);
            PaqueteService.getPaquete($scope.idPaquete).then(function(response){
                $scope.paquete = response;
                console.log(response);
            });
        }
        else {
            //ACCESO PROHIBIDO
            console.log("aCCESO PROHUBIDO");
            $location.path('/busquedaAuto');
        }
    }

    initialize();

  }]);
