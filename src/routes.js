module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/hello',
      component: 'app'
    })
    .state('event', {
      url: '/event/:id',
      component: 'event'
    })
    .state('events', {
      url: '/',
      component: 'events'
    })
    .state('profile', {
      url: '/profile',
      component: 'profile'
    });
}
