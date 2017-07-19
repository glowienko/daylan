angular.module('daylan.home.tasks')
    .controller('AddGoalController', function ($scope, $window, $element, close) {
        'ngInject';

        $scope.newGoal = {
            body: '',
            type: 'userGoal',
            progress: 0,
            achived: false,
            tasksDone: 0,
            tasksInProgress: 0,
        };

        $scope.close = function () {
            close({
                newGoal: $scope.newGoal
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        $scope.cancel = function () {
            $element.modal('hide');
            close({
                newGoal: undefined
            }, 500); // close, but give 500ms for bootstrap to animate
        };

    });