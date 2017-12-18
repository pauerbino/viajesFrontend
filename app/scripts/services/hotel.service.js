'use strict';
angular.module('viajesApp')
    .service('HotelService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        var service = {};
        var cache = {
            hoteles: null
        };

        service.reset = function() {
            cache = {
                hoteles: null
            };
        };

        service.getHoteles = function(destino, estrellas) {
            var deferred = $q.defer();
            if (cache.hoteles) {
                deferred.resolve(cache.hoteles);
            } else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/hoteles/'+ destino +'/'+ estrellas
                }).then(function (response) {
                    cache.hoteles = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getHotel = function(id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/hoteles/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        return service;
    }]);
