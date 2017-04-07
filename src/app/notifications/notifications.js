module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $cookies) {
    $scope.hello = 'Hello World!';
    $http.get("http://localhost:5000/notifications/get", {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        var clean = [];
        for (var i = 0; i < res.data.notifications.length; i++) {
          if (res.data.notifications[i] !== null) {
            clean.push(res.data.notifications[i]);
          }
        }
        $scope.notifications = clean;
      }
    });
  }
};
