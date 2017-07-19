angular.module('daylan.home.notes')
    .service('NotesService', function ($http, $window) {
        'ngInject';

        this.addNote = function (newNote) {
            return $http.post('/userProfile/' + $window.sessionStorage['profile-owner'] + '/notes', newNote);
        };

        this.deleteNote = function (noteId) {
            return $http.delete('/userProfile/' + $window.sessionStorage['profile-owner'] + '/notes/' + noteId);
        };
    });