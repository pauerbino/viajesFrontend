'use strict';
angular.module('viajesApp')
    .service('CiudadService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        var service = {};
        var cache = {
            ciudades: null
        };

        service.reset = function() {
            cache = {
                ciudades: null
            };
        };

        service.getCiudades = function() {
            var deferred = $q.defer();
            if (cache.ciudades) {
                deferred.resolve(cache.ciudades);
            } else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/ciudades'
                }).then(function (response) {
                    cache.ciudades = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getCiudad = function(id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/ciudades/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        return service;
    }]);
