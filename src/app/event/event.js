module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $location, $cookies, $http, $state, $rootScope) {
    var id = $stateParams.id;
    $scope.id = id;
    var currTabUrl = $location.url().substring($location.url().lastIndexOf("/"));
    var currTab = {};

    $scope.$watch(function () {
      return $rootScope.eventTabs;
    }, function () {
      $scope.tabs = $rootScope.eventTabs;

      if (angular.isDefined($scope.tabs)) {
        var currUrl = $location.url().substring($location.url().lastIndexOf("/"));
        var currTab = {};

        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].state = '';
          if ($scope.tabs[i].url === currUrl) {
            currTab = $scope.tabs[i];
          }
        }

        setClass(currTab);
      }
    });

    $http.get('http://localhost:5000/event/' + id + '/tabs', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $rootScope.eventTabs = res.data.tabs;
        for (var i = 0; i < $rootScope.eventTabs.length; i++) {
          $rootScope.eventTabs[i].state = '';
          if ($rootScope.eventTabs[i].url === currTabUrl) {
            currTab = $rootScope.eventTabs[i];
          }
        }

        setClass(currTab);
      }
    });

    $scope.setSelectedClass = function (tab) {
      setSelectedClass(tab);
    };

    function setClass(tab) {
      for (var i = 0; i < $rootScope.eventTabs.length; i++) {
        if ($rootScope.eventTabs[i].url === tab.url) {
          $rootScope.eventTabs[i].state = 'selected';
        } else {
          $rootScope.eventTabs[i].state = '';
        }
      }
    }

    function updateTabs(tab, setClass) {
      $http.get('http://localhost:5000/event/' + id + '/tabs', {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          $rootScope.eventTabs = res.data.tabs;
          setClass(tab);
        }
      });
    }

    function setSelectedClass(tab) {
      $state.go('app.event.' + tab.appState);

      updateTabs(tab, setClass);
    }

    $scope.createEvent = function () {
      $location.path('/create');
    };
  }
};
