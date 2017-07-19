angular.module('daylan.home.tasks')
    .service('TasksService', function ($http, $window, AwardService, GoalsService) {
        'ngInject';

        this.goalsForTask = {};

        this.saveGoalsForTask = function (newGoalsForTasks) {
            this.goalsForTask = angular.copy(newGoalsForTasks);
        };

        this.getUserDefinedGoals = function () {
            return this.goalsForTask.filter(function (element) {
                return element.type === 'userGoal' && element.achived === false;
            });
        };

        this.addTask = function (newTask) {
            return $http.post('/userProfile/' + $window.sessionStorage['profile-owner'] + '/tasks', newTask);
        };

        this.deleteTask = function (taskId) {
            return $http.delete('/userProfile/' + $window.sessionStorage['profile-owner'] + '/tasks/' + taskId);
        };
        
        this.incrementTasksDone = function() {
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/taskDone');
        };
    });