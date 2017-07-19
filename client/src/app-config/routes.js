angular.module('daylan')
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('firstPage', {
				url: '/',
				templateUrl: 'modules/firstPage.html'
			})
			.state('registration', {
				url: '/registration',
				templateUrl: 'modules/registration/registration.html',
				controller: 'RegistrationController',

			})
			.state('login', {
				url: '/login',
				templateUrl: 'modules/login/login.html',
				controller: 'LoginController'
			})
			.state('home', {
				url: '/home',
				templateUrl: 'modules/home/home.html',
				resolve: {
					userProfile: function ($http, $window) {
						'ngInject';
						return $http.get('/userProfile/' + $window.sessionStorage['profile-owner']);
					}
				},
				controller: 'HomeController',
				data: {
					requiresLogin: true
				}
			})
			.state('home.myProfile', {
				url: '/myProfile',
				templateUrl: 'modules/home/user-profile/user-profile.html',
				resolve: {
					userProfile: function ($http, $window) {
						'ngInject';
						return $http.get('/userProfile/' + $window.sessionStorage['profile-owner']);
					}
				},
				controller: 'UserProfileController',
				data: {
					requiresLogin: true
				}
			})
			.state('home.profilesOverview', {
				url: '/profilesOverview',
				templateUrl: 'modules/profiles-overview/profiles-overview.html',
				resolve: {
					profiles: function ($http) {
						'ngInject';
						return $http.get('/userProfile');
					}
				},
				controller: 'ProfilesOverviewController',
				data: {
					requiresLogin: true
				}
			})
			.state('home.profileDetails', {
				url: '/profilesOverview/details',
				templateUrl: 'modules/profiles-overview/profile-overview-details.html',
				controller: 'ProfilesOverviewDetailsController',
				data: {
					requiresLogin: true
				}
			})
			.state('home.goals', {
				url: '/goals',
				templateUrl: 'modules/home/goals/goals.html',
				resolve: {
					userProfile: function ($http, $window) {
						return $http.get('/userProfile/' + $window.sessionStorage['profile-owner']);
					}
				},
				controller: 'GoalsController',
				data: {
					requiresLogin: true
				}
			})
			.state('home.tasks', {
				url: '/tasks',
				templateUrl: 'modules/home/tasks/tasks.html',
				resolve: {
					userProfile: function ($http, $window) {
						return $http.get('/userProfile/' + $window.sessionStorage['profile-owner']);
					}
				},
				controller: 'TasksController',
				data: {
					requiresLogin: true
				}
			})
			.state('home.notes', {
				url: '/notes',
				templateUrl: 'modules/home/notes/notes.html',
				resolve: {
					userProfile: function ($http, $window) {
						return $http.get('/userProfile/' + $window.sessionStorage['profile-owner']);
					}
				},
				controller: 'NotesController',
				data: {
					requiresLogin: true
				}
			});
		$urlRouterProvider.otherwise('/');
	}]);