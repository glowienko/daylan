angular.module('daylan.home.notes')
    .controller('NotesController', function ($scope, userProfile, NotesService, ModalService) {
        'ngInject';

        $scope.notes = userProfile.data.userNotes;
        $scope.userProfile = userProfile.data;

        $scope.isAnyNote = function () {
            return (typeof $scope.notes === 'undefined' || $scope.notes.length === 0) ? false : true;
        };

        $scope.addNote = function () {
            ModalService.showModal({
                templateUrl: 'modules/home/notes/add-note-modal/add-note-modal.html',
                controller: 'AddNoteController'
            }).then(function (modal) {
                handleModal(modal);
            });
        };

        function handleModal(modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                addNoteFromModalIfValid(result);
            });
        }

        function addNoteFromModalIfValid(result) {
            if (typeof result.newNote !== 'undefined') {
                NotesService.addNote(result.newNote).success(function (newNotes) {
                    $scope.notes = angular.copy(newNotes);
                });
            }

        }

        $scope.deleteNote = function (note) {
            NotesService.deleteNote(note._id).success(function (newNotes) {
                $scope.notes = angular.copy(newNotes);
            });
        };
    });