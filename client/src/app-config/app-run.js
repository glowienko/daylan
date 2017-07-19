angular.module('daylan')
  .run(function (authManager) {
    'ngInject';
    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();
  });