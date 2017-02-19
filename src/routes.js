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
    .state('dashboard', {
      url: '/',
      component: 'dashboard'
    })
    .state('dashboard.events', {
      url: 'events',
      component: 'events'
    })
    .state('dashboard.profile', {
      url: 'profile',
      component: 'profile'
    })
    .state('event', {
      url: '/event/:id',
      component: 'event'
    })
    .state('event.map', {
      url: '/map',
      component: 'map'
    });
}
