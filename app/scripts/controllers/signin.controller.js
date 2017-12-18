'use strict';
angular.module('viajesApp')
  .controller('SigninCtrl', ['$location', '$scope', 'UserService', function ($location, $scope, UserService) {

    $scope.credentials = {
      name : "",
      email : "",
      password : ""
    };

    $scope.error = "";

    function initialize() {
      $scope.error = "";
    }

    initialize();

    $scope.register = function() {
        if ($scope.signinForm.$valid) {
            UserService.register($scope.credentials).then(function(response){
              if (response.error) {
                $scope.error = response.error;
                $location.path('/signin');
              }
              else{
                $location.path('/miCarrito');
              }
            });
        }
    };

  }]);
