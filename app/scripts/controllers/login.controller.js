'use strict';
angular.module('viajesApp')
  .controller('LoginCtrl', ['$location', '$scope', 'UserService', function ( $location, $scope, UserService) {

    $scope.credentials = {
      email : "",
      password : ""
    };

    $scope.error = "";

    $scope.login = function() {
        if ($scope.loginForm.$valid) {
            UserService.login($scope.credentials).then(function(){
              $location.path('/lists');
            }).catch(function(){
                $scope.error = "El usuario o la contraseña no son validos. Por favor intentar nuevamente.";
            });
        }
    };

    $scope.signin = function() {
      $location.path('/signin');
    };

  }]);
