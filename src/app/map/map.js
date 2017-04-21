module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $cookies, $stateParams) {
    $http.get("http://localhost:5000/event/" + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.event = res.data.event;
      }
    });
  }
};
