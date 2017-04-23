module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $http, $cookies) {
    var id = $stateParams.id;
    $http.get("http://localhost:5000/event/" + id + "/role", {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.role = res.data.role;
      }
    });

    $scope.id = id;
    $scope.hello = 'Hello Profile!';
    $scope.peoplePaid = [
      {
        name: 'Cole Johnson'
      },
      {
        name: 'Abigail Alderson'
      },
      {
        name: 'Keegan Irby'
      },
      {
        name: 'Kevin Cardona'
      },
      {
        name: 'Kyle Pollina'
      }
    ];
  }
};
