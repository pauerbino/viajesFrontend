'use strict';
angular.module('viajesApp')
    .service('UserService', ['$http', '$q', '$rootScope', '$window', 'Configuration', function ($http, $q, $rootScope, $window, Configuration) {
        var service = {};

        function saveToken (token) {
            $window.localStorage['mean-token'] = token;
        }

        function getToken () {
            return $window.localStorage['mean-token'];
        }

        service.isLoggedIn = function() {
            var token = getToken();
            var payload;

            if(token){
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return payload.exp > Date.now() / 1000;
            }
            else {
                return false;
            }
        };

        service.currentUser = function() {

            if(service.isLoggedIn()){
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    email : payload.email,
                    name : payload.name
                };
            }
        };

        service.register = function(user) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: Configuration.getConfiguration().baseURL + '/register',
                data: user
            }).then(function (response) {
                if (response.data.token) {
                    console.log("Se setea token");
                    saveToken(response.data.token);
                    $rootScope.$broadcast('updateNavigation');
                }
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.getUsers = function() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/users',
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.deleteUser = function(idUser) {
            console.log("Se borrara el usuario");
            var deferred = $q.defer();
            $http({
                 method : 'DELETE',
                 url : Configuration.getConfiguration().baseURL + '/users/' + idUser 
            }).then(function(response) {
                 deferred.resolve(response.data);
            }).catch(function(response) {
                 deferred.reject(response);
            });

            return deferred.promise;
        };

        service.login = function(user) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: Configuration.getConfiguration().baseURL + '/users',
                data: user
            }).then(function (response) {
                saveToken(response.data.token);
                $rootScope.$broadcast('updateNavigation');
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.logout = function() {
            $window.localStorage.removeItem('mean-token');
            $rootScope.$broadcast('updateNavigation');
        };

        service.getProfile = function () {
            return $http.get('/api/profile', {
                headers: {
                    Authorization: 'Bearer '+ getToken()
            }
            });
        };

        return service;

    }]);
