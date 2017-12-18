'use strict';
angular.module('viajesApp')
  .controller('BusquedaVueloCtrl', [ '$filter', '$location', '$routeParams', '$scope', 'AerolineaService', 'CiudadService', 'PaqueteService', 'UserService', 'VueloService', function ( $filter, $location, $routeParams, $scope, AerolineaService, CiudadService, PaqueteService, UserService, VueloService) {

    $scope.vuelos = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.aerolineas = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.idPaquete = $routeParams.idPaquete;
    $scope.currentDate = new Date();
    $scope.enBusqueda = false;

    function initialize() {
        CiudadService.getCiudades().then(function(response){
            $scope.ciudades = response;
        });
        AerolineaService.getAerolineas().then(function(response){
            $scope.aerolineas = response;
        });
    }

    initialize();

    $scope.isLoggedIn = function() {
        return UserService.isLoggedIn();
    };

    $scope.buscar = function() {
        $scope.resultadoBusqueda = [];
        var aerolineaId;
        VueloService.reset();
        if (($scope.busqueda.origen) && ($scope.busqueda.destino) &&($scope.busqueda.fecha)){
            var fecha = $filter('date')($scope.busqueda.fecha, "dd-MM-yyyy");
            if (!$scope.busqueda.aerolinea) {
                aerolineaId = 99;
            }
            else {
                aerolineaId = $scope.busqueda.aerolinea._id;
            }
            console.log(aerolineaId);
            VueloService.getVuelos($scope.busqueda.origen._id, $scope.busqueda.destino._id, fecha, aerolineaId).then(function(response){
                for (var i = 0; i < response.length; i++) {
                    response[i].enCarrito = false;
                    $scope.enBusqueda = true;
                }
                console.log(response);
                $scope.resultadoBusqueda = response;
            });
        }
    };

    $scope.agregarAlCarrito = function(vuelo) {
        PaqueteService.nuevaReservaVuelo($scope.idPaquete, vuelo._id, vuelo.precio).then(function(){
            PaqueteService.reset();
            vuelo.enCarrito = true;
            // PaqueteService.getPaquete($scope.idPaquete).then(function(resp){
            //     console.log(resp);
            // });
        });

    };

    $scope.irBusquedaAuto = function() {
        $location.path('/busquedaAuto/'+$scope.idPaquete);
    };

    $scope.irBusquedaHotel = function() {
        $location.path('/busquedaHotel/'+$scope.idPaquete);
    };

  }]);
