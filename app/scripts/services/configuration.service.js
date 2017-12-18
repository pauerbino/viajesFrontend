'use strict';
angular.module('viajesApp')
    .service('Configuration', [function () {
        var configurations = {
            baseURL: "https://viajes-backend.herokuapp.com/api/v1"
        };

        this.getConfiguration = function() {
            return configurations;
        };

}]);
