module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $location, $cookies, $http, $rootScope) {
    $rootScope.url = "http://localhost:5000";
    $scope.hello = 'Hello Profile!';

    $scope.eventSelected = 'selected';
    $scope.feedSelected = '';
    $scope.profileSelected = '';

    $scope.setSelectedClass = function (tab) {
      setSelectedClass(tab);
    };

    $scope.logout = function () {
      $cookies.remove('token');
      $location.url('/login');
    };

    function setSelectedClass(tab) {
      if (tab === '/profilesettings') {
        $scope.eventSelected = 'selected';
        $scope.feedSelected = '';
        $scope.profileSelected = '';
      } else if (tab === '/profile/profile') {
        $scope.eventSelected = 'selected';
        $scope.feedSelected = '';
        $scope.profileSelected = '';
      } else if (tab === '/') {
        $location.path('event');
      }
    }

    setSelectedClass($location.url());
  }
};
