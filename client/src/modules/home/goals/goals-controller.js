angular.module('daylan.home.goals')
    .controller('GoalsController', function ($scope, userProfile, GoalsService, ModalService) {
        'ngInject';

        $scope.goals = userProfile.data.userGoals;

        $scope.isAnyGoals = function () {
            return (typeof $scope.goals === 'undefined' || $scope.goals.length === 0) ? false : true;
        };

        $scope.addGoal = function () {
            ModalService.showModal({
                templateUrl: 'modules/home/goals/add-goal-modal/add-goal-modal.html',
                controller: 'AddGoalController'
            }).then(function (modal) {
                handleModal(modal);
            });
        };

        function handleModal(modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                addGoalFromModalIfValid(result);
            });
        }

        function addGoalFromModalIfValid(result) {
            if (typeof result.newGoal !== 'undefined') {
                GoalsService.addGoal(result.newGoal).success(function (newGoals) {
                    $scope.goals = angular.copy(newGoals);
                });
            }

        }

        $scope.deleteGoal = function (goal) {
            GoalsService.deleteGoal(goal._id).success(function (newGoals) {
                $scope.goals = angular.copy(newGoals);
            });
        };

        $scope.isUserGoal = function(goal) {
          return goal.type === 'userGoal';
        };
    });