angular.module('daylan.home.user-profile')
    .service('UserProfileService', function ($http,$window) {
        'ngInject';

        this.userProfile = {};

        this.goPro = function () {
           return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goPro');
        };
    });