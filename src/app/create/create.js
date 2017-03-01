module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $cookies, $location, $rootScope) {
    $scope.invites = [];

    $scope.addPerson = function () {
      if (validateEmail($scope.invite)) {
        $scope.invites.unshift({email: $scope.invite});
        $http.get($rootScope.url + 'person/' + $scope.invite, {headers: {token: $cookies.get('token')}}).then(function (res) {
          var name;
          if (res.data.success) {
            name = res.data.name;
          } else {
            name = 'Requires Invite';
          }

          for (var i = 0; i < $scope.invites.length; i++) {
            if ($scope.invites[i].email === $scope.invite) {
              $scope.invites[i].name = name;
            }
          }
        });
      } else {
        $scope.message = "Not a valid email";
      }
    };

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    $scope.create = function () {
      try {
        if (angular.isUndefined($scope.name)) {
          $scope.message = 'Please add an event name.';
        } else if (angular.isUndefined($scope.location)) {
          $scope.message = 'Please add an event location.';
        } else if (angular.isUndefined($scope.dateFrom) ||
                   angular.isUndefined($scope.timeFrom.hours) ||
                   angular.isUndefined($scope.timeFrom.minutes) ||
                   angular.isUndefined($scope.timeFrom.twelve)) {
          $scope.message = 'Please add an event start time.';
        } else if (angular.isUndefined($scope.dateTo) ||
                   angular.isUndefined($scope.timeTo.hours) ||
                   angular.isUndefined($scope.timeTo.minutes) ||
                   angular.isUndefined($scope.timeTo.twelve)) {
          $scope.message = 'Please add an event end time.';
        } else {
          var dateStart = new Date($scope.dateFrom);
          var dateEnd = new Date($scope.dateTo);
          var timeFrom = $scope.timeFrom;
          var timeTo = $scope.timeTo;

          // Modifies the date object to update the time
          if (angular.isDefined(timeFrom.twelve) && timeFrom.twelve === 'am') {
            dateStart.setHours(timeFrom.hours % 12);
            dateStart.setMinutes(timeFrom.minutes);
          } else if (angular.isDefined(timeFrom.twelve) && timeFrom.twelve === 'pm') {
            var twentyFourFrom = parseInt(timeFrom.hours, 10) + 12;
            dateStart.setHours(twentyFourFrom);
            dateStart.setMinutes(timeFrom.minutes);
          } else {
            $scope.message = 'Please choose am or pm';
          }

          // Modifies the date object to update the time
          if (angular.isDefined(timeTo.twelve) && timeTo.twelve === 'am') {
            dateEnd.setHours(timeTo.hours % 12);
            dateEnd.setMinutes(timeTo.minutes);
          } else if (angular.isDefined(timeTo.twelve) && timeTo.twelve === 'pm') {
            var twentyFourTo = parseInt(timeTo.hours, 10) + 12;
            dateEnd.setHours(twentyFourTo);
            dateEnd.setMinutes(timeTo.minutes);
          } else {
            $scope.message = 'Please choose am or pm';
          }

          var obj = {
            title: $scope.name,
            location: $scope.location,
            dateStart: dateStart,
            dateEnd: dateEnd
          };

          $http.post('http://localhost:5000/create', obj, {headers: {token: $cookies.get('token')}}).then(function (res) {
            if (res.data.success) {
              $location.path('/event/' + res.data.eventId);
            }
          });
        }
      } catch (err) {
        $scope.message = 'Please fill in all forms.';
      }
    };
  }
};
