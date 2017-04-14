module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $cookies, $stateParams, $state) {
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
        $scope.guests.yes = res.data.yes;
        $scope.guests.no = res.data.no;
        $scope.guests.maybe = res.data.maybe;
        $scope.guests.pending = res.data.pending;
      }
    });

    $http.get("http://localhost:5000/event/" + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.event = res.data.event;
      }
    });
    $http.get("http://localhost:5000/events/info/" + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.guests = res.data;
      }
    });

    $http.get('http://localhost:5000/event/' + $stateParams.id + '/role', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.isHost = res.data.role === 'host';
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
