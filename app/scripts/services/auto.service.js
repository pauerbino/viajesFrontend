'use strict';
angular.module('viajesApp')
    .service('AutoService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        var service = {};
        var cache = {
            autos: null
        };

        service.reset = function() {
            cache = {
                autos: null
            };
        };

        service.getAutos = function(retiro, devolucion, fechaRetiro, fechaDevolucion) {
            var deferred = $q.defer();
            if (cache.autos) {
                deferred.resolve(cache.autos);
            } else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/autos/'+ retiro +'/'+ devolucion + '/' + fechaRetiro + '/' + fechaDevolucion
                }).then(function (response) {
                    cache.autos = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getAuto = function(id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/autos/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        return service;
    }]);
