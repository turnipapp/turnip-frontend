module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $location, $cookies, API) {
    $scope.message = '';

    $scope.login = function () {
      var login = {
        email: $scope.email,
        password: $scope.password
      };
      $http.post(API.url + 'auth/login', login).then(function (res) {
        if (res.data.success) {
          $cookies.put('token', res.data.token);
          $location.path('/events');
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
