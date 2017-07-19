angular.module('daylan.home.user-profile')
    .service('AwardService', function ($http, $window) {
        'ngInject';


        this.addPointsForFinishingTask = function (task) {
            var pointsPayload = {
                points: task.importance * 10
            };
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/addPoints', pointsPayload);
        };

        this.addPointsForUserGoal = function (level) {
            var pointsPayload = {
                points: (100 + 100 * (level / 2))
            };
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/addPoints', pointsPayload);
        };

        this.addPointsForCustomGoal = function (level) {
            var pointsPayload = {
                points: (100 + 100 * (level / 2))
            };
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/addPoints', pointsPayload);
        };


        this.checkForNextLevel = function () {
            return $http.put('/userProfile/' + $window.sessionStorage['profile-owner'] + '/nextLevel');
        };
    });