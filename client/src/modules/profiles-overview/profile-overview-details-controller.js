angular.module('daylan.profilesOverview')
    .controller('ProfilesOverviewDetailsController', function ($scope, $state, ProfilesOverviewService) {
        'ngInject';

        $scope.userProfile = ProfilesOverviewService.getCurrentProfile();

        $scope.goBack = function () {
            $state.go('home.profilesOverview');
        };
    });