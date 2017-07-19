angular.module('daylan.registration')
    .controller('RegistrationController', function ($scope, $state, AuthorizationService) {
        'ngInject';

        $scope.isLoginAvailable = true;

        $scope.registerUser = function (user) {
            AuthorizationService.register(user)
                .then(function (result) {
                    AuthorizationService.saveToken(result.data.token);
                    AuthorizationService.saveOwner(result.data.userProfile.owner);
                    AuthorizationService.saveOwnersType(result.data.type);
                    if (user.type == 'regular') {
                        $state.go('home.myProfile');
                    }
                    else if(user.type == 'viewer'){
                        $state.go('home.profilesOverview');
                    }
                }, function (errorResponse) {
                    $scope.isLoginAvailable = false;
                    $scope.newUser.username = '';
                });
        };

        $scope.isFormValid = function () {
            if ($scope.newUser === undefined || $scope.newUser === {}) {
                return false;
            }
            if ($scope.newUser.name === undefined || $scope.newUser.email === undefined ||
                $scope.newUser.password === undefined || $scope.newUser.username === undefined ||
                $scope.newUser.type === undefined) {
                return false;
            }
            return true;
        };

        $scope.closeAlert = function () {
            $scope.isLoginAvailable = true;
        };
    });