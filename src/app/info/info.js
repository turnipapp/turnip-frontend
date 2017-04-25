module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $cookies, $stateParams, $state) {
    $scope.tab = 'yes';
    $scope.setTab = function (tab) {
      $scope.guestTabs.current = tab.name;
      for (var i = 0; i < $scope.guestTabs.tabs.length; i++) {
        if ($scope.guestTabs.tabs[i].name === tab.name) {
          $scope.guestTabs.tabs[i].state = 'selected';
        } else {
          $scope.guestTabs.tabs[i].state = '';
        }
      }
    };

    $scope.guests = {
      yes: ["Loading..."],
      no: ["Loading..."],
      maybe: ["Loading..."],
      pending: ["Loading..."]
    };
    // $scope.$watch('guests', function () {});

    $http.get("http://localhost:5000/event/" + $stateParams.id + "/getInviteStatus", {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.guests = res.data;
      }
    });

    $http.get("http://localhost:5000/event/" + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.event = res.data.event;
      }
    });

    $http.get('http://localhost:5000/event/' + $stateParams.id + '/role', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.isHost = res.data.role === 'host';
      }
    });

    $http.get('http://localhost:5000/weather/get/' + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.weather = res.data.weather.body.currently;
        $scope.location = res.data.location;
      }
    });

    $scope.delete = function () {
      $http.delete("http://localhost:5000/event/" + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          $state.go('app.events');
        }
      });
    };
  }
};
