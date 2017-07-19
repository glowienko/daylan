angular.module('daylan.authorization')
    .service('AuthorizationService', function ($http, $window, authManager) {
        'ngInject';

        this.saveToken = function (token) {
            $window.sessionStorage['user-token'] = token;
        };

        this.saveOwnersType = function (type) {
            $window.sessionStorage['user-type'] = type;
        };

        this.saveOwner = function (owner) {
            $window.sessionStorage['profile-owner'] = owner;
        };

        this.logIn = function (user) {
            return $http.post('/login', user);
        };

        this.register = function (user) {
            return $http.post('/registration', user);
        };

        this.logOut = function () {
            $window.sessionStorage.removeItem('user-token');
            $window.sessionStorage.removeItem('profile-owner');
            $window.sessionStorage.removeItem('user-type');
            authManager.unauthenticate();
        };


    });