angular.module('daylan.profilesOverview')
    .controller('ProfilesOverviewController', function ($scope, $state, profiles, ProfilesOverviewService ) {
        'ngInject';

        $scope.profiles = filterProfilesToShow(profiles.data);
        $scope.seeDetails = function (userProfile) {
            ProfilesOverviewService.updateUserProfile(userProfile);
            $state.go('home.profileDetails');
        };

        function filterProfilesToShow(profiles) {
            return profiles.filter(function (profile) {
                return profile.ownersType === 'regular';
            });
        }
    });