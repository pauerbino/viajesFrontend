'use strict';
angular.module('viajesApp')
    .service('PaqueteService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        var service = {};
        var cache = {
            paquete: null
        };

        service.reset = function() {
            cache = {
                paquete: null
            };
        };

        service.getMisPaquetes = function(email) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/paquetes/' + email 
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.getPaquetes = function() {
            var deferred = $q.defer();
            if (cache.paquete) {
                deferred.resolve(cache.paquete);
            } else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/paquetes'
                }).then(function (response) {
                    cache.paquete = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getPaquete = function(id) {
            console.log("En el servicio");
            console.log(id);
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/paquetes/miPaquete/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.nuevaReservaHotel = function(idPaquete, hotel, monto, fechaIngreso, fechaSalida) {
            var deferred = $q.defer();
            var body = {
                idPaquete: idPaquete,
                hotel: hotel,
                monto: monto,
                fechaIngreso: fechaIngreso,
                fechaSalida: fechaSalida
            };

            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/paquetes/ReservaHotel',
                data: body
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.nuevaReservaVuelo = function(idPaquete, vuelo, monto) {
            var deferred = $q.defer();
            var body = {
                idPaquete: idPaquete,
                vuelo: vuelo,
                monto: monto
            };

            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/paquetes/ReservaVuelo',
                data: body
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.nuevaReservaAuto = function(idPaquete, auto, monto, lugarRetiro, lugarDevolucion, fechaRetiro, fechaDevolucion) {
            var deferred = $q.defer();
            var body = {
                idPaquete: idPaquete,
                auto: auto,
                monto: monto,
                lugarRetiro: lugarRetiro,
                lugarDevolucion: lugarDevolucion,
                fechaRetiro: fechaRetiro,
                fechaDevolucion: fechaDevolucion
            };

            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/paquetes/ReservaAuto',
                data: body
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.pagarPaquete = function(idPaquete, nombrePaquete) {

            var deferred = $q.defer();
            $http({
                method : 'PUT',
                url : Configuration.getConfiguration().baseURL + '/paquetes/pagar/' + idPaquete + '/' + nombrePaquete,
                data: {}
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.getPaqueteActual = function(email) {
            //Tiene que tomar el paquete del usuario logueado que tenga pagar en false, si no tiene deberia venir vacio y crearse uno
            var deferred = $q.defer();
            $http({
                 method : 'GET',
                 url : Configuration.getConfiguration().baseURL + '/paquetes/habilitado/' + email
            }).then(function(response) {
                 deferred.resolve(response.data);
            }).catch(function(response) {
                 deferred.reject(response);
            });

            return deferred.promise;
        };

        service.quitarVueloDelPaquete = function(idReserva, idPaquete) {
            var deferred = $q.defer();
            $http({
                 method : 'DELETE',
                 url : Configuration.getConfiguration().baseURL + '/paquetes/quitarVuelo/' + idReserva + '/' + idPaquete
            }).then(function(response) {
                 deferred.resolve(response.data);
            }).catch(function(response) {
                 deferred.reject(response);
            });

            return deferred.promise;
        };

        service.quitarHotelDelPaquete = function(idReserva, idPaquete) {
            var deferred = $q.defer();
            $http({
                 method : 'DELETE',
                 url : Configuration.getConfiguration().baseURL + '/paquetes/quitarHotel/' + idReserva + '/' + idPaquete
            }).then(function(response) {
                 deferred.resolve(response.data);
            }).catch(function(response) {
                 deferred.reject(response);
            });

            return deferred.promise;
        };

        service.quitarAutoDelPaquete = function(idReserva, idPaquete) {
            var deferred = $q.defer();
            $http({
                 method : 'DELETE',
                 url : Configuration.getConfiguration().baseURL + '/paquetes/quitarAuto/' + idReserva + '/' + idPaquete
            }).then(function(response) {
                 deferred.resolve(response.data);
            }).catch(function(response) {
                 deferred.reject(response);
            });

            return deferred.promise;
        };

        return service;
    }]);
