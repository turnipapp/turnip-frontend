module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $location) {
    var id = $stateParams.id;
    $scope.id = id;
    $scope.hello = 'Hello Event!';

    $scope.discussionSelected = '';
    $scope.mapSelected = '';
    $scope.infoSelected = '';

    $scope.setSelectedClass = function (tab) {
      setSelectedClass(tab);
    };

    function setSelectedClass(tab) { 
      var subRoute = tab.substring(tab.lastIndexOf("/"));
      console.log(subRoute);
      if (subRoute === '/discussion') {
        $scope.discussionSelected = 'selected';
        $scope.mapSelected = '';
        $scope.infoSelected = '';
      } else if (subRoute === '/map') {
        $scope.discussionSelected = '';
        $scope.mapSelected = 'selected';
        $scope.infoSelected = '';
      } else if (subRoute === '/info') {
        $scope.discussionSelected = '';
        $scope.mapSelected = '';
        $scope.infoSelected = 'selected';
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
