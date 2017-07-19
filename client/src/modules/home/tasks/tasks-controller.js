angular.module('daylan.home.tasks')
    .controller('TasksController', function ($scope, userProfile, GoalsService, TasksService, AwardService, ModalService, $window, UserProfileService) {
        'ngInject';

        $scope.tasks = userProfile.data.userTasks;

        $scope.isAnyTask = function () {
            return (typeof $scope.tasks === 'undefined' || $scope.tasks.length === 0) ? false : true;
        };
        $scope.addTask = function () {
            TasksService.saveGoalsForTask(userProfile.data.userGoals);
            ModalService.showModal({
                templateUrl: 'modules/home/tasks/add-task-modal/add-task-modal.html',
                controller: 'AddTaskController'
            }).then(function (modal) {
                handleModal(modal);
            });
        };

        function handleModal(modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                addTaskFromModalIfValid(result);
            });
        }

        function addTaskFromModalIfValid(result) {
            if (typeof result.newTask !== 'undefined') {
                TasksService.addTask(result.newTask).then(
                    function success(response) {
                        $scope.tasks = angular.copy(response.data);
                    },
                    function error(err) {
                    });
            }
            if (result.goalForTask !== undefined) {
                if (result.goalForTask._id !== undefined) {
                    GoalsService.addTaskForGoal(result.goalForTask);
                }
            }
        }

        $scope.deleteTask = function (task, isFinished) {

            TasksService.deleteTask(task._id).success(function (newProfile) {
                if (task.goal_id !== '' && !isFinished) {
                    GoalsService.unpinTaskFromGoal(task);
                }
                UserProfileService.userProfile = newProfile;
                $scope.tasks = angular.copy(newProfile.userTasks);
            });
        };

        $scope.finishTask = function (task) {
            TasksService.incrementTasksDone().then(
                function successCallback(response) {//in response is payload = { progress: newProgress, level: level}
                    $scope.deleteTask(task, true);
                    AwardService.addPointsForFinishingTask(task).then(
                        function successCallback(response) {
                            console.log('addPointsForFinishingTask , successCallback, response: ' + response);
                            checkNextLevel();
                        },
                        function errorCallback(response) {
                            console.log('FAILED: addPointsForFinishingTask, response: ' + response);
                        });
                    GoalsService.markTaskDoneForCustomGoal();
                    console.log(task.goal_id);
                    if (task.goal_id !== '') {
                        GoalsService.markTaskDoneForUserGoal(task);
                    }
                    checkNextLevel();
                },
                function errorCallback(response) {
                    console.log('incrementTasksDone , errorCallback, response: ' + response);

                });
        };

        function chceckNextLevelByLevelsDifference(levelsDifference) {
            if (levelsDifference > 0) {
                showNextLevelModal(UserProfileService.userProfile.level);
            }
        }

        function showNextLevelModal(actualLevel) {
            alert('CONGRATULATION ! You have reached next level! :) Actual level: ' + actualLevel);
        }

        function checkNextLevel() {
            AwardService.checkForNextLevel().then(
                function successCallback(response) {
                    console.log('checkForNextLevel , successCallback, response: ' + response);
                    UserProfileService.userProfile = response.data.userProfile;
                    chceckNextLevelByLevelsDifference(response.data.levelsDifference);
                },
                function errorCallback(response) {
                    console.log('FAILED: checkForNextLevel, response: ' + response);
                });
        }

    });


