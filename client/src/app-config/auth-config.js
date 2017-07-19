angular.module('daylan')
  .config(function Config($httpProvider, jwtOptionsProvider) {
    'ngInject';
    jwtOptionsProvider.config({
      tokenGetter: [function () {
        return sessionStorage.getItem('user-token');
      }],
      unauthenticatedRedirector: ['$state', function ($state) {
        console.log('user is not authenticated');
        $state.go('firstPage');
      }]
    });
    $httpProvider.interceptors.push('jwtInterceptor');
  });