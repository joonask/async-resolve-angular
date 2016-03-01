'use strict';

/**
 * @ngdoc function
 * @name appisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appisApp
 */
angular.module('appisApp')
  .config(routes)
  .controller('MainCtrl', MainCtrl)
;


function auth($q, $timeout) {
  var defer = $q.defer();
  $timeout(function() {
    console.log('auth resolved');
    defer.resolve({name: 'myUsername'});
  }, 2500);
  return defer.promise;
}


function routes($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '',              // need to be empty
        abstract: true,       // no linking to this state directly
        resolve: {
          auth: auth          // resolves auth state always
        },
        template: '<ui-view/>' // required
      })
      .state('app.main', {
        url: '/',
        controller: 'MainCtrl',
        templateUrl: 'views/main.html'
      })
      .state('app.route', {
        url: '/route',
        templateUrl: 'views/route.html'
      })
      .state('app.route.sub1', {
        url: '/sub1',
        template: '<p>Sub route 1</p>'
      })
      .state('app.route.sub2', {
        url: '/sub2',
        template: '<p>Sub route 2</p>'
      })
    ;

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}

function MainCtrl($scope, auth) {
  console.log('MainCtrl');
  $scope.user = auth;
}
