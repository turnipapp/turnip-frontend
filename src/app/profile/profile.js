module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $cookies, $location) {
    $scope.hello = 'Hello Profile!';

    $scope.logout = function () {
      $cookies.remove('token');
      $location.url('/login');
    };
  }
};
