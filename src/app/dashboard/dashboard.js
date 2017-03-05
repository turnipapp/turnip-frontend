module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $location) {
    $scope.hello = 'Hello Dashboard!';

    $scope.eventSelected = 'selected';
    $scope.feedSelected = '';
    $scope.profileSelected = '';
    $scope.createSelected = '';

    $scope.setSelectedClass = function (tab) {
      setSelectedClass(tab);
    };

    function setSelectedClass(tab) {
      console.log(tab);
      if (tab === '/event') {
        $scope.eventSelected = 'selected';
        $scope.feedSelected = '';
        $scope.profileSelected = '';
        $scope.createSelected = '';
      } else if (tab === '/feed') {
        $scope.eventSelected = '';
        $scope.feedSelected = 'selected';
        $scope.profileSelected = '';
        $scope.createSelected = '';
      } else if (tab === '/profile') {
        $scope.eventSelected = '';
        $scope.feedSelected = '';
        $scope.profileSelected = 'selected';
        $scope.createSelected = '';
      } else if (tab === '/create') {
        $scope.eventSelected = '';
        $scope.feedSelected = '';
        $scope.profileSelected = '';
        $scope.createSelected = 'selected';
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
