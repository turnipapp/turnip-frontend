module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $cookies, $location) {
    $scope.hello = 'Hello Profile!';

    $scope.user = {
      firstName: 'bob',
      lastName: 'sa',
      email: 'bob@sagot.com'
    };

    $scope.logout = function () {
      $cookies.remove('token');
      $location.url('/login');
    };
  }
};
