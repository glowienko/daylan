angular.module('daylan.home')
    .controller('HomeController', function($scope, $state, AuthorizationService, userProfile, UserProfileService, $window) {
        'ngInject';

        UserProfileService.userProfile = userProfile.data;
        $scope.points = userProfile.data.points;
        $scope.level = userProfile.data.level;


        $scope.$watch(
        function() { return UserProfileService.userProfile; }, 
        function(newValue, oldValue, scope) {
            if (newValue !== oldValue) {
                scope.points = UserProfileService.userProfile.points;
                scope.level = UserProfileService.userProfile.level;
            }
        });
        $scope.logOut = function() {
            AuthorizationService.logOut();
        };

        $scope.goPro = function() {
            UserProfileService.goPro()
                .then(
                function successCallback(response) {
                    $scope.points = response.data.points;
                    $scope.level = response.data.level;
                    $window.sessionStorage['user-type'] = 'regular';
                    $state.go('home.myProfile');
                },
                function errorCallback(response) {
                });
        };

        $scope.isRegularUser = function() {
            if ($window.sessionStorage['user-type'] === 'viewer') {
                return false;
            }
            return true;
        };

    });