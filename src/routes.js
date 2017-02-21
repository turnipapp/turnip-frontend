module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/events');

  $stateProvider
    .state('dashboard', {
      url: '/',
      component: 'dashboard',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('dashboard.events', {
      url: 'events',
      component: 'events',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('dashboard.profile', {
      url: 'profile',
      component: 'profile',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('event', {
      url: '/event/:id',
      component: 'event',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('event.map', {
      url: '/map',
      component: 'map',
      resolve: {
        user: mustBeLoggedIn
      }
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

var mustBeLoggedIn = function ($q, $cookies, $location) {
  var deferred = $q.defer();

  if ($cookies.get('token')) {
    deferred.resolve();
  } else {
    deferred.reject();
    $location.url('/login');
  }
};
