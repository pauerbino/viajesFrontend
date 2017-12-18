'use strict';
angular.module('viajesApp')
  .controller('BusquedaHotelCtrl', [ '$filter', '$location', '$routeParams', '$scope', 'HotelService', 'CiudadService', 'PaqueteService', 'UserService', function ( $filter, $location,  $routeParams, $scope, HotelService, CiudadService, PaqueteService, UserService) {

    $scope.hoteles = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.idPaquete = $routeParams.idPaquete;
    $scope.paquete = null;
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
                PaqueteService.reset();
                PaqueteService.getPaquete($scope.idPaquete).then(function(resp){
                    $scope.paquete = resp;
                    HotelService.reset();
                    var estrellas =  ($scope.busqueda.estrellas)? $scope.busqueda.estrellas.id:99;
                    HotelService.getHoteles($scope.busqueda.destino._id,estrellas).then(function(response){
                        for (var i = 0; i < response.length; i++) {
                            response[i].enCarrito = false;
                        }
                        $scope.resultadoBusqueda = response;
                        $scope.enBusqueda = true;
                    });
                });
            }
            else {
                $scope.errorMessage = true;
            }
        }
    };

    $scope.agregarAlCarrito = function(hotel) {
        var fechaIngreso = $filter('date')($scope.busqueda.fechaIngreso, "dd-MM-yyyy");
        var fechaSalida = $filter('date')($scope.busqueda.fechaSalida, "dd-MM-yyyy");
        PaqueteService.nuevaReservaHotel($scope.idPaquete, hotel._id, hotel.monto, fechaIngreso, fechaSalida).then(function(){
            PaqueteService.reset();
            hotel.enCarrito = true;
        });
    };

    $scope.irBusquedaAuto = function() {
        $location.path('/busquedaAuto/'+$scope.idPaquete);
    };

    $scope.irBusquedaVuelo = function() {
        $location.path('/busquedaVuelo/'+$scope.idPaquete);
    };

  }]);
