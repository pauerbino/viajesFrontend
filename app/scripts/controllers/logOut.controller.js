'use strict';
angular.module('viajesApp')
  .controller('LogOutCtrl', ['$location', '$scope', 'UserService', function ( $location, $scope, UserService) {

    function initialize() {
        UserService.logout();
        $location.path('/home');
    }

    initialize();

  }]);
