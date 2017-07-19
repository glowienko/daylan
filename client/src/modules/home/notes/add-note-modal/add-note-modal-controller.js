angular.module('daylan.home.tasks')
    .controller('AddNoteController', function ($scope, $element, close) {
        'ngInject';

        $scope.newNote = {
            title: '',
            body: ''
        };

        $scope.close = function () {
            close({
                newNote: $scope.newNote
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        $scope.cancel = function () {
            $element.modal('hide');
            close({
                newTask: undefined
            }, 500); // close, but give 500ms for bootstrap to animate
        };
    });