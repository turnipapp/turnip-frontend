module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $location) {
    $scope.hello = 'Hello Dashboard!';

    $scope.eventSelected = 'selected';
    $scope.feedSelected = '';
    $scope.profileSelected = '';

    $scope.setSelectedClass = function (tab) {
      setSelectedClass(tab);
    };

    function setSelectedClass(tab) {
      if (tab === '/event') {
        $scope.eventSelected = 'selected';
        $scope.feedSelected = '';
        $scope.profileSelected = '';
      } else if (tab === '/feed') {
        $scope.eventSelected = '';
        $scope.feedSelected = 'selected';
        $scope.profileSelected = '';
      } else if (tab === '/profile') {
        $scope.eventSelected = '';
        $scope.feedSelected = '';
        $scope.profileSelected = 'selected';
      } else if (tab === '/') {
        $location.path('event');
      }
    }

    setSelectedClass($location.url());

    $scope.createEvent = function () {
      $location.path('/create');
    };
  }
};
