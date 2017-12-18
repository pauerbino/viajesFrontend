'use strict';
angular.module('viajesApp')
  .controller('BusquedaAutoCtrl', ['$location', '$routeParams', '$scope', '$filter', 'AutoService', 'CiudadService', 'UserService', 'PaqueteService', function ( $location, $routeParams, $scope, $filter, AutoService, CiudadService, UserService, PaqueteService) {

    $scope.autos = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.idPaquete = $routeParams.idPaquete;
    $scope.currentDate = new Date();
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
        AutoService.reset();
        if (($scope.busqueda.lugarRetiro) && ($scope.busqueda.lugarDevolucion) && ($scope.busqueda.fechaRetiro) && ($scope.busqueda.fechaDevolucion)){
            if ($scope.busqueda.fechaRetiro <= $scope.busqueda.fechaDevolucion) {
                var fechaRetiro = $filter('date')($scope.busqueda.fechaRetiro, "dd-MM-yyyy");
                var fechaDevolucion = $filter('date')($scope.busqueda.fechaDevolucion, "dd-MM-yyyy");
                AutoService.getAutos($scope.busqueda.lugarRetiro._id, $scope.busqueda.lugarDevolucion._id, fechaRetiro, fechaDevolucion).then(function(response){
                    for (var i = 0; i < response.length; i++) {
                        response[i].enCarrito = false;
                    }
                    $scope.resultadoBusqueda = response;
                    $scope.enBusqueda = true;
                });
            }
            else {
                $scope.errorMessage = true;
            }
        }
    };

    $scope.agregarAlCarrito = function(auto) {
        var fechaRetiro = $filter('date')($scope.busqueda.fechaRetiro, "dd-MM-yyyy");
        var fechaDevolucion = $filter('date')($scope.busqueda.fechaDevolucion, "dd-MM-yyyy");
        PaqueteService.nuevaReservaAuto($scope.idPaquete, auto._id, auto.monto, $scope.busqueda.lugarRetiro._id, $scope.busqueda.lugarDevolucion._id, fechaRetiro, fechaDevolucion).then(function(response){
            console.log(response);
            PaqueteService.reset();
            auto.enCarrito = true;
        });
    };

    $scope.irBusquedaHoteles = function() {
        $location.path('/busquedaHotel/'+$scope.idPaquete);
    };

    $scope.irBusquedaVuelo = function() {
        $location.path('/busquedaVuelo/'+$scope.idPaquete);
    };
  }]);
