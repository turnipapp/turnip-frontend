module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $location, API) {
    $scope.message = "";

    $scope.signup = function () {
      if (!validateEmail($scope.email)) {
        $scope.message = "Not a valid email";
      } else if (passwordsDontMatch($scope.password, $scope.confirmPassword)) {
        $scope.message = "Passwords don't match";
      } else {
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
      }
    };

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function passwordsDontMatch(password, confirmPassword) {
      return password !== confirmPassword;
    }
  }
};
