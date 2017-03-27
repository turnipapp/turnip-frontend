module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $http, $cookies, $state, $rootScope) {
    var id = $stateParams.id;

    $http.get("http://localhost:5000/event/" + id + "/apps", {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.apps = res.data.apps;
        for (var i = 0; i < $scope.apps.length; i++) {
          $scope.apps[i].showDeleteModal = false;
        }
      }
    });

    $scope.addApp = function (app) {
      $http.post("http://localhost:5000/event/" + id + "/apps", app, {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          $state.go('app.event.' + app.appState);
          $http.get("http://localhost:5000/event/" + id + "/tabs", {headers: {token: $cookies.get('token')}}).then(function (res) {
            if (res.data.success) {
              $rootScope.eventTabs = res.data.tabs;
            }
          });
        }
      });
    };

    $scope.deleteApp = function (app) {
      $http.delete("http://localhost:5000/event/" + id + "/apps/" + app.id, {headers: {token: $cookies.get('token')}}).then(function (delRes) {
        if (delRes.data.success) {
          // Get Updated Apps
          $http.get("http://localhost:5000/event/" + id + "/apps", {headers: {token: $cookies.get('token')}}).then(function (res) {
            if (res.data.success) {
              $scope.apps = res.data.apps;
              for (var i = 0; i < $scope.apps.length; i++) {
                $scope.apps[i].showDeleteModal = false;
              }
            }
          });

          // Get updated Tabs
          $http.get("http://localhost:5000/event/" + id + "/tabs", {headers: {token: $cookies.get('token')}}).then(function (res) {
            if (res.data.success) {
              $rootScope.eventTabs = res.data.tabs;
            }
          });
        }
      });
    };
  }
};
