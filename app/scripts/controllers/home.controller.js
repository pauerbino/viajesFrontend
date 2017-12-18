'use strict';
angular.module('viajesApp')
  .controller('HomeCtrl', ['$location', '$scope', 'PaqueteService', 'UserService',
    function ($location, $scope, PaqueteService, UserService) {

    $scope.isLoggedIn = false;

    $scope.currentUser = {
        email : "",
        name : ""
    };

    function initialize() {
        $scope.isLoggedIn = UserService.isLoggedIn();
    }

    $scope.buscarAutos = function() {
        if ($scope.isLoggedIn) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                console.log(response);
                $location.path('/busquedaAuto/'+response._id);
            });
        } else {
            $location.path('/busquedaAuto');
        }
    };

    $scope.buscarHoteles = function() {
        if ($scope.isLoggedIn) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                console.log(response);
                $location.path('/busquedaHotel/'+response._id);
            });
        } else {
            $location.path('/busquedaHotel');
        }
    };

    $scope.buscarVuelos = function() {
        if ($scope.isLoggedIn) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                console.log(response);
                $location.path('/busquedaVuelo/'+response._id);
            });
        } else {
            $location.path('/busquedaVuelo');
        }
    };

    initialize();

  }]);
