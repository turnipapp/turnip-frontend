module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $cookies, $rootScope, $location) {
    $scope.feed = [];

    $http.get("http://localhost:5000/feed", {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.feed = res.data.feed;
      }
    });

    $scope.goToEvent = function (id) {
      $rootScope.eventSelected = '';
      $rootScope.feedSelected = '';
      $rootScope.profileSelected = '';
      $rootScope.createSelected = '';
      $location.path('/event/' + id);
    };
  }
};
