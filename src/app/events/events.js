module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $cookies, $http, $location, $rootScope) {
    $http.get('http://localhost:5000/themes', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.themes = res.data.themes;
      }
    });

    $http.get('http://localhost:5000/events/past', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.past = res.data.past;
      }
    });

    $http.get('http://localhost:5000/events/upcoming', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.upcoming = res.data.upcoming;
      }
    });

    $scope.updateResponse = function (id, response) {
      if (response === 'yes' || response === 'no' || response === 'maybe') {
        var token = $cookies.get('token');
        var postObj = {token: token, eventId: id, response: response};

        $http.post("http://localhost:5000/events/response", postObj).then(function (res) {
          if (res.data.success) {
            for (var i = 0; i < $scope.events.length; i++) {
              if ($scope.events[i].id === id) {
                $scope.events[i].response = response;
              }
            }
          }
        });
      }
    };

    $scope.goToEvent = function (id) {
      $rootScope.eventSelected = '';
      $rootScope.feedSelected = '';
      $rootScope.profileSelected = '';
      $rootScope.createSelected = '';
      $location.path('/event/' + id);
    };
  }
};
