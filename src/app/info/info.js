module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $cookies, $stateParams, $state) {
    $http.get("http://localhost:5000/event/" + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.event = res.data.event;
      }
    });

    $http.get('http://localhost:5000/event/' + $stateParams.id + '/role', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.isHost = res.data.role === 'host';
      }
    });

    $scope.delete = function () {
      $http.delete("http://localhost:5000/event/" + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          $state.go('app.events');
        }
      });
    };
  }
};
