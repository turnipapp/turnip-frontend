module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $location, $rootScope) {
    $scope.hello = 'Hello Dashboard!';

    $rootScope.eventSelected = 'selected';
    $rootScope.feedSelected = '';
    $rootScope.profileSelected = '';
    $rootScope.createSelected = '';

    $scope.setSelectedClass = function (tab) {
      setSelectedClass(tab);
    };

    function setSelectedClass(tab) {
      if (tab === '/events') {
        $rootScope.eventSelected = 'selected';
        $rootScope.feedSelected = '';
        $rootScope.profileSelected = '';
        $rootScope.createSelected = '';
      } else if (tab === '/feed') {
        $rootScope.eventSelected = '';
        $rootScope.feedSelected = 'selected';
        $rootScope.profileSelected = '';
        $rootScope.createSelected = '';
      } else if (tab === '/profile') {
        $rootScope.eventSelected = '';
        $rootScope.feedSelected = '';
        $rootScope.profileSelected = 'selected';
        $rootScope.createSelected = '';
      } else if (tab === '/create') {
        $rootScope.eventSelected = '';
        $rootScope.feedSelected = '';
        $rootScope.profileSelected = '';
        $rootScope.createSelected = 'selected';
      } else if (tab === '/') {
        $rootScope.eventSelected = '';
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
