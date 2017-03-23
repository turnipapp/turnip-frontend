module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $location) {
    var id = $stateParams.id;
    $scope.id = id;
    $scope.hello = 'Hello Event!';
    $scope.discussionSelected = 'selected';
    $scope.mapSelected = '';

    $scope.setSelectedClass = function (tab) {
      setSelectedClass(tab);
    };

    function setSelectedClass(tab) { 
      var subRoute = tab.substring(tab.lastIndexOf("/"));
      if (subRoute === '/discussion') {
        $scope.discussionSelected = 'selected';
        $scope.mapSelected = '';
      } else if (subRoute === '/map') {
        $scope.discussionSelected = '';
        $scope.mapSelected = 'selected';
      } else if (subRoute === '/') {
        $location.path('event');
      }
    }

    setSelectedClass($location.url());

    $scope.createEvent = function () {
      $location.path('/create');
    };
  }
};
