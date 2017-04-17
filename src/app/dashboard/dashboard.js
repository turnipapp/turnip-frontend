module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $location, $rootScope, $state) {
    $scope.hello = 'Hello Dashboard!';

    $rootScope.eventSelected = 'selected';
    $rootScope.notiSelected = '';
    $rootScope.feedSelected = '';
    $rootScope.profileSelected = '';
    $rootScope.createSelected = '';

    $scope.setSelectedClass = function (tab) {
      setSelectedClass(tab);
    };

    function setSelectedClass(tab) {
      if (tab === '/events') {
        $rootScope.eventSelected = 'selected';
        $rootScope.notiSelected = '';
        $rootScope.feedSelected = '';
        $rootScope.profileSelected = '';
        $rootScope.createSelected = '';
      } else if (tab === '/notifications') {
        $rootScope.eventSelected = '';
        $rootScope.notiSelected = 'selected';
        $rootScope.feedSelected = '';
        $rootScope.profileSelected = '';
        $rootScope.createSelected = '';
      } else if (tab === '/feed') {
        $rootScope.eventSelected = '';
        $rootScope.notiSelected = '';
        $rootScope.feedSelected = 'selected';
        $rootScope.profileSelected = '';
        $rootScope.createSelected = '';
      } else if (tab === '/profile') {
        $rootScope.eventSelected = '';
        $rootScope.notiSelected = '';
        $rootScope.feedSelected = '';
        $rootScope.profileSelected = 'selected';
        $rootScope.createSelected = '';
      } else if (tab === '/create') {
        $rootScope.eventSelected = '';
        $rootScope.notiSelected = '';
        $rootScope.feedSelected = '';
        $rootScope.profileSelected = '';
        $rootScope.createSelected = 'selected';
      } else if (tab === '/') {
        $state.go('app.events');
        $rootScope.eventSelected = '';
        $rootScope.notiSelected = '';
        $rootScope.feedSelected = '';
        $rootScope.profileSelected = '';
        $rootScope.createSelected = '';
      }
    }

    setSelectedClass($location.url());

    $scope.createEvent = function () {
      $location.path('/create');
    };
  }
};
