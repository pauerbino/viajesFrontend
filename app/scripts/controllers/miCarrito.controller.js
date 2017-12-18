'use strict';
angular.module('viajesApp')
  .controller('MiCarritoCtrl', [ '$filter', '$location', '$rootScope', '$scope', 'HotelService', 'CiudadService', 'PaqueteService', 'UserService', function ( $filter, $location, $rootScope, $scope, HotelService, CiudadService, PaqueteService, UserService) {

    $scope.hoteles = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.idPaquete = null;
    $scope.paquete = null;
    $scope.pagoExitoso = false;
    $scope.nombrePaquete = "Mi paquete";
    $scope.editNombrePaquete = false;

    $scope.currentUser = {
        email : "",
        name : ""
    };

    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                $scope.paquete = response;
                $scope.idPaquete = $scope.paquete._id;
                window.localStorage['montoPaquete'] = $scope.paquete.montoTotal;
                window.data = $scope.paquete.montoTotal;
            });
        }
        else {
            $location.path('/home');
        }
    }

    initialize();

    $scope.modificarNombrePaquete = function(nombre) {
        $scope.nombrePaquete = nombre;
        $scope.editNombrePaquete = false;
        $location.path('/miCarrito');
    };

    $scope.editarNombrePaquete = function() {
        $scope.editNombrePaquete = true;
        $location.path('/miCarrito');
    };

    $scope.buscarAutos = function() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                $location.path('/busquedaAuto/'+response._id);
            });
        } else {
            $location.path('/busquedaAuto');
        }
    };

    $scope.buscarHoteles = function() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                $location.path('/busquedaHotel/'+response._id);
            });
        } else {
            $location.path('/busquedaHotel');
        }
    };

    $scope.buscarVuelos = function() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                $location.path('/busquedaVuelo/'+response._id);
            });
        } else {
            $location.path('/busquedaVuelo');
        }
    };

    $scope.quitarVueloDelCarrito = function(reserva) {
        PaqueteService.quitarVueloDelPaquete(reserva._id, $scope.idPaquete).then(function(){
            initialize();
        });
    };

    $scope.quitarHotelDelCarrito = function(reserva) {
        PaqueteService.quitarHotelDelPaquete(reserva._id, $scope.idPaquete).then(function(){
            initialize();
        });
    };

    $scope.quitarAutoDelCarrito = function(reserva) {
        PaqueteService.quitarAutoDelPaquete(reserva._id, $scope.idPaquete).then(function(){
            initialize();
        });
    };

    $scope.irAInicio =function(){
        $location.path('/home');
    };

    $scope.irAMisReservas =function(){
        $location.path('/misReservas');
    };

    $rootScope.$on('pagarPaquete', pagar);

    function pagar() {
        PaqueteService.pagarPaquete($scope.idPaquete, $scope.nombrePaquete).then(function(){
            $scope.pagoExitoso = true;
            // initialize();
        });
    }


  }]);