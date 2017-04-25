module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $cookies, $http, $location, $rootScope) {
    $scope.loading = {
      past: true,
      upcoming: true
    };

    $http.get('http://localhost:5000/themes', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.themes = res.data.themes;
      }
    });

    $http.get('http://localhost:5000/events/past', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.past = res.data.past;
        $scope.loading.past = false;
      }
    });

    $http.get('http://localhost:5000/events/upcoming', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.upcoming = res.data.upcoming;
        $scope.loading.upcoming = false;
      }
    });

    $scope.updateResponse = function (event, response) {
      console.log(event);
      if (response === 'yes' || response === 'no' || response === 'maybe') {
        var postObj = {response: response};
        var headers = {headers: {token: $cookies.get('token')}};

        $http.put("http://localhost:5000/event/" + event._id + "/updateInvite", postObj, headers).then(function (res) {
          if (res.data.success) {
            for (var i = 0; i < $scope.events.length; i++) {
              if ($scope.events[i].id === event._id) {
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
