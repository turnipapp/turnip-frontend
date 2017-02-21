module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $location, API) {
    $scope.message = "";

    $scope.signup = function () {
      var signup = {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        email: $scope.email,
        password: $scope.password
      };
      $http.post(API.url + 'auth/signup/', signup).then(function (res) {
        if (res.data.success) {
          $scope.message = res.data.message;
          $location.path("/login");
        } else {
          $scope.message = res.data.message;
        }
      });
    };
  }
};
