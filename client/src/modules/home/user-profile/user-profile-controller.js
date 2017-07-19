angular.module('daylan.home.user-profile')
    .controller('UserProfileController', function ($scope, userProfile, UserProfileService) {
        'ngInject';

        UserProfileService.userProfile = userProfile.data;
        $scope.userProfile = userProfile.data;
    });