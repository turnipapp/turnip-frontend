module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $rootScope, $cookies, $http) {
    $http.get($rootScope.url + '/account', {
      headers: {
        token: $cookies.get('token')
      }
    }).then(function (res) {
      if (res.data.success) {
        console.log(res.data);
        $scope.userData = res.data;
      }
    });
  }
};
