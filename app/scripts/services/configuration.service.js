'use strict';
angular.module('viajesApp')
    .service('Configuration', [function () {
        var configurations = {
            baseURL: "http://localhost:3000/api/v1"
        };

        this.getConfiguration = function() {
            return configurations;
        };

}]);
