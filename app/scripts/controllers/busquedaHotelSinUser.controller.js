'use strict';
angular.module('viajesApp')
  .controller('BusquedaHotelSinUserCtrl', [ '$filter', '$location', '$scope', 'HotelService', 'CiudadService', 'UserService', function ( $filter, $location, $scope, HotelService, CiudadService, UserService) {

    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.currentDate = new Date();
    $scope.opcionEstrellas = [ { id:99, name: ''}, { id:1, name: '1'},{ id:2, name: '2'},{ id:3, name: '3'},{ id:4, name: '4'},{ id:5, name: '5'}];
    $scope.busqueda.estrellas =  $scope.opcionEstrellas[0];
    $scope.errorMessage = false;
    $scope.enBusqueda = false;

    function initialize() {
        CiudadService.getCiudades().then(function(response){
            $scope.ciudades = response;
        });
    }

    initialize();

    $scope.isLoggedIn = function() {
        return UserService.isLoggedIn();
    };


    $scope.buscar = function() {
        $scope.resultadoBusqueda = [];
        $scope.errorMessage = false;
        if (($scope.busqueda.destino)&&($scope.busqueda.fechaIngreso)&&($scope.busqueda.fechaSalida)){
            if ($scope.busqueda.fechaIngreso < $scope.busqueda.fechaSalida) {
                HotelService.reset();
                var estrellas =  ($scope.busqueda.estrellas)? $scope.busqueda.estrellas.id:99;
                HotelService.getHoteles($scope.busqueda.destino._id,estrellas).then(function(response){
                    $scope.resultadoBusqueda = response;
                    $scope.enBusqueda = true;
                });
            }
            else {
                $scope.errorMessage = true;
            }
        }
    };

    $scope.irBusquedaAuto = function() {
        $location.path('/busquedaAuto');
    };

    $scope.irBusquedaVuelo = function() {
        $location.path('/busquedaVuelo');
    };

  }]);
