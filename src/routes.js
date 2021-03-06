module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.when('/profile', '/profile/settings');
  $urlRouterProvider.when('/event/:id', '/event/:id/discussion');
  $urlRouterProvider.otherwise('events');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'dashboard',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.create', {
      url: 'create',
      component: 'create',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.events', {
      url: 'events',
      component: 'events',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.feed', {
      url: 'feed',
      component: 'feed',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.notifications', {
      url: 'notifications',
      component: 'notifications',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.profile', {
      url: 'profile',
      component: 'profile',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.profile.profilesettings', {
      url: '/settings',
      component: 'profilesettings',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.profile.myprofile', {
      url: '/myprofile',
      component: 'myprofile',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.event', {
      url: 'event/:id',
      component: 'event',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.event.map', {
      url: '/map',
      component: 'map',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.event.spotify', {
      url: '/spotify',
      component: 'spotify',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.event.venmo', {
      url: '/venmo',
      component: 'venmo',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.event.discussion', {
      url: '/discussion',
      component: 'discussion',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.event.info', {
      url: '/info',
      component: 'info',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.event.apps', {
      url: '/apps',
      component: 'apps',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('app.event.memories', {
      url: '/memories',
      component: 'memories',
      resolve: {
        user: mustBeLoggedIn
      }
    })
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('invite', {
      url: '/invite/:id',
      component: 'invite'
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
