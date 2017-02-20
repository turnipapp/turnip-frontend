module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $location) {
    $scope.message = '';

    $scope.login = function () {
      var login = {
        email: $scope.email,
        password: $scope.password
      };
      $http.post('http://localhost:5000/auth/login', login).then(function (res) {
        if (res.data.success) {
          $location.path('/');
        } else {
          $scope.message = res.data.message;
        }
      });
    };

    $scope.signup = function () {
      $location.path('/signup');
    };
  }
};
