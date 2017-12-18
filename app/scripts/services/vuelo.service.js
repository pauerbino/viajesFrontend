'use strict';
angular.module('viajesApp')
    .service('VueloService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        var service = {};
        var cache = {
            vuelos: null
        };

        service.reset = function() {
            cache = {
                vuelos: null
            };
        };

        service.getVuelos = function(origen, destino, fecha, aerolineaId) {
            var deferred = $q.defer();
            if (cache.vuelos) {
                deferred.resolve(cache.vuelos);
            } else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/vuelos/'+ fecha +'/'+ origen + '/' + destino + '/' + aerolineaId
                }).then(function (response) {
                    cache.vuelos = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getVuelo = function(id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/vuelos/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        return service;
    }]);
