angular.module('daylan.home.goals')
    .service('GoalsService', function ($http, $window, AwardService) {
        'ngInject';

        this.addGoal = function (newGoal) {
            return $http.post('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goals', newGoal);
        };

        this.deleteGoal = function (goalId) {
            unpinGoalFromTasks(goalId);
            return $http.delete('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goals/' + goalId);
        };

        this.addTaskForGoal = function (goalForTask) {
            incrementTasksInProgressForGoal(goalForTask._id).then(
                function successCallback(response) {
                    console.log('incrementTasksInProgressForGoal for goal: ' + goalForTask);
                },
                function errorCallback(response) {
                    console.log('FAILED IN : incrementTasksInProgressForGoal for goal: ' + goalForTask);
                    $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goals/' + goalForTask._id + '/tasksInProgressUp/v2');
                });
        };

        this.unpinTaskFromGoal = function (task) {
            if (task.goal_id) {
                decrementTasksInProgressForGoal(task.goal_id)
                    .then(
                    function successCallback(response) {
                        checkIfUserGoalAchived(task.goal_id, response.data);
                    },
                    function errorCallback(response) {
                    });
            }
        };

        this.markTaskDoneForUserGoal = function (task) {
            $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goals/' + task.goal_id + '/taskDone/v2').then(
                function successCallback(response) {//in response is payload = { progress: newProgress, level: level}
                    checkIfUserGoalAchived(task._id, response.data.progress, response.data.level);
                },
                function errorCallback(response) {
                });
        };

        this.markTaskDoneForCustomGoal = function () {
            $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goals' + '/customGoal' + '/taskDone/v3').then(
                function successCallback(response) {//in response is payload = { progress: newProgress, level: level}
                    checkIfCustomGoalAchived(response.data.progress, response.data.level);
                },
                function errorCallback(response) {
                    $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goals' + '/customGoal' + '/taskDone/v3').then(
                        function successCallback(response) {//in response is payload = { progress: newProgress, level: level}
                            checkIfCustomGoalAchived(response.data.progress, response.data.level);
                        },
                        function errorCallback(response) {

                        });
                });
        };

        function checkIfUserGoalAchived(goalId, progress, level) {
            if (progress == 100) {
                AwardService.addPointsForUserGoal(level).then(
                    function successCallback(response) {//in response is payload = { progress: newProgress, level: level}
                        console.log('addPointsForUserGoal , successCallback, response: ' + response);
                        markGoalFinished(goalId).then(
                            function successCallback(response) {//in response is payload = { progress: newProgress, level: level}
                                console.log('markGoalFinished , successCallback, response: ' + response);
                            },
                            function errorCallback(response) {
                                console.log('FAILED: markGoalFinished, response: ' + response);
                            });
                        incrementGoalsDoneForUserProfile();
                    },
                    function errorCallback(response) {
                        console.log('FAILED: addPointsForUserGoal, response: ' + response);
                    });
            }
        }

        function checkIfCustomGoalAchived(progress, level) {
            if (progress == 100) {
                AwardService.addPointsForCustomGoal(level).then(
                    function successCallback(response) {//in response is payload = { progress: newProgress, level: level}
                        console.log('addPointsForCustomGoal , successCallback, response: ' + response);
                        upgradeCustomGoal().then(
                            function successCallback(response) {//in response is payload = { progress: newProgress, level: level}
                                console.log('upgradeCustomGoal , successCallback, response: ' + response);
                            },
                            function errorCallback(response) {
                                console.log('FAILED: upgradeCustomGoal, response: ' + response);
                            });
                        incrementGoalsDoneForUserProfile();
                    },
                    function errorCallback(response) {
                        console.log('FAILED: addPointsForCustomGoal, response: ' + response);
                    });
            }
        }

        function unpinGoalFromTasks(goalId) {
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/tasks' + '/unpinGoal/' + goalId);
        }

        function markGoalFinished(goalId) {
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goals/' + goalId + '/achived');
        }

        function incrementTasksInProgressForGoal(goalId) {
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goals/' + goalId + '/tasks/inProgress/up');
        }

        function decrementTasksInProgressForGoal(goalId) {
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goals/' + goalId + '/tasksInProgressDown');
        }

        function incrementGoalsDoneForUserProfile() {
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goalAchived');
        }

        function upgradeCustomGoal() {
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/goals/customGoal/upgrade');
        }
    });
