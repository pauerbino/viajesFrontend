'use strict';
angular.module('viajesApp')
  .controller('MainCtrl', ['$rootScope','$scope', 'UserService',
    function ($rootScope, $scope, UserService) {

    $scope.isLoggedIn = false;
    $scope.currentUser = {
        email : "",
        name : ""
    };

    function initialize() {
        $scope.isLoggedIn = UserService.isLoggedIn();
    }

    $rootScope.$on('updateNavigation', initialize);
    initialize();

    $scope.pagarPaquete = function() {
        $rootScope.$emit('pagarPaquete');
    };

    $scope.isAdmin = function() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            if ($scope.currentUser.email === "admin@hotmail.com") {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
  }]);
