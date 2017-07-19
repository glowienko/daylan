angular.module('daylan.home.tasks')
    .controller('AddTaskController', function ($scope, TasksService, $window, $element, close) {
        'ngInject';

        $scope.newTask = {
            body: '',
            time: '',
            date: new Date(),
            importance: '',
            goal_id: ''
        };
        $scope.selectedGoalTitle = 'Choose one goal';
        $scope.selectedGoalForTask = {};
        $scope.goalsForTask = TasksService.getUserDefinedGoals();

        $scope.selectGoal = function (goal) {
            $scope.selectedGoalForTask = angular.copy(goal);
            $scope.selectedGoalTitle = goal.body;
            $scope.newTask.goal_id = goal._id;
        };

        $scope.close = function () {
            close({
                newTask: $scope.newTask,
                goalForTask: $scope.selectedGoalForTask
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        $scope.cancel = function () {
            $element.modal('hide');
            close({
                newTask: undefined,
                goalForTask: undefined
            }, 500); // close, but give 500ms for bootstrap to animate
        };

    });