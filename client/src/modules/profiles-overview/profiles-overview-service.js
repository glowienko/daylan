angular.module('daylan.profilesOverview')
    .service('ProfilesOverviewService', function () {
        'ngInject';

        this.currentUserProfile = {};

        this.updateUserProfile = function (newProfile) {
            this.currentUserProfile = newProfile;
        };

        this.getCurrentProfile = function() {
            return this.currentUserProfile;
        };

    });