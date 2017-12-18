'use strict';
angular.module('viajesApp')
    .service('AerolineaService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        var service = {};
        var cache = {
            aerolineas: null
        };

        service.reset = function() {
            cache = {
                aerolineas: null
            };
        };

        service.getAerolineas = function() {
            var deferred = $q.defer();
            if (cache.aerolineas) {
                deferred.resolve(cache.aerolineas);
            } else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/aerolineas'
                }).then(function (response) {
                    cache.aerolineas = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getAerolinea = function(id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/aerolineas/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        return service;
    }]);
