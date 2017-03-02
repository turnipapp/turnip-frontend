module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $http, $cookies) {
    $scope.hello = "hi";
    var id = $stateParams.id;

    $http.get('http://localhost:5000/event/' + id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      $scope.event = res.data.event;
      var themeId = $scope.event.theme;
      $http.get('http://localhost:5000/themes/' + themeId, {headers: {token: $cookies.get('token')}}).then(function (res) {
        $scope.image = res.data.theme.large;
      });
    });
  }
};
