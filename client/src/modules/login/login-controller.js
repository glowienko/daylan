angular.module('daylan.login')
    .controller('LoginController', function ($scope, $state, AuthorizationService) {
        'ngInject';

        $scope.logIn = function (user) {
            AuthorizationService.logIn(user).then(function (result) {
                AuthorizationService.saveToken(result.data.token);
                AuthorizationService.saveOwner(result.data.userProfile.owner);
                AuthorizationService.saveOwnersType(result.data.userProfile.ownersType);
                if (result.data.userProfile.ownersType === 'regular') {
                    $state.go('home.myProfile');
                }
                else {
                    $state.go('home.profilesOverview');
                }

            });
        };

        $scope.isFormValid = function () {
            if ($scope.user === undefined || $scope.user === {}) {
                return false;
            }
            if ($scope.user.password === undefined || $scope.user.username === undefined) {
                return false;
            }
            return true;
        };
    });