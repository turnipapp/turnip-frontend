module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/events');

  $stateProvider
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
    })
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('signup', {
      url: '/signup',
      component: 'signup'
    });
}
