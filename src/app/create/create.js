module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $cookies, $location) {
    $scope.steps = {
      state: 0,
      steps: [
        {
          title: 'Basic Info',
          class: 'current-state'
        },
        {
          title: 'Theme',
          class: ''
        },
        {
          title: 'Invite',
          class: ''
        }
      ]
    };
    $scope.invites = [];
    $scope.invite = {};
    $scope.event = {};

    /*
     * Controls what state in the event creation we are in
     */
    $scope.setState = function (state) {
      if (state >= 0 && state < $scope.steps.steps.length) {
        $scope.steps.state = state;
        for (var i = 0; i < $scope.steps.steps.length; i++) {
          if (i === state) {
            $scope.steps.steps[i].class = 'current-state';
          } else {
            $scope.steps.steps[i].class = '';
          }
        }
      }
    };

    /*
     * Gets all themes from the theme route
     */
    $http.get('http://localhost:5000/themes', {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.themes = res.data.themes;
      }
    });

    /*
     * Sets the desired event theme
     */
    $scope.chooseTheme = function (theme) {
      $scope.event.theme = theme;
    };

    /*
     * Validates the email address then adds the person to the list of invites
     */

    $scope.addPerson = function () {
      $scope.invite = $scope.invite.new;
      if (angular.isUndefined($scope.invite)) {
        $scope.message = 'You need to type something first.';
        return;
      }

      if (validateEmail($scope.invite)) {
        $scope.invites.unshift({email: $scope.invite});
        $http.get('http://localhost:5000/user/email/' + $scope.invite, {headers: {token: $cookies.get('token')}}).then(function (res) {
          for (var i = 0; i < $scope.invites.length; i++) {
            if ($scope.invites[i].email === $scope.invite) {
              $scope.invites[i] = res.data;
            }
          }
          $scope.invite = {
            new: ''
          };
        });
      } else {
        $scope.message = "Not a valid email";
      }
    };

    /*
     * Finds the user by id then removes them from the invite array
     */
    $scope.removePerson = function (id) {
      var index;
      for (var i = 0; i < $scope.invites.length; i++) {
        if ($scope.invites[i].id === id) {
          index = i;
          break;
        }
      }
      $scope.invites.splice(index, 1);
    };

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    /*
     * Verifies all input and does the POST to create the event
     */
    $scope.create = function () {
      try {
        if (allForms()) {
          var dateFrom = new Date($scope.event.dateFrom.date);
          dateFrom.setHours($scope.event.dateFrom.time.getHours());
          dateFrom.setMinutes($scope.event.dateFrom.time.getMinutes());

          var dateTo = new Date($scope.event.dateTo.date);
          dateTo.setHours($scope.event.dateTo.time.getHours());
          dateTo.setMinutes($scope.event.dateTo.time.getMinutes());

          var event = {
            title: $scope.event.name,
            location: $scope.event.location,
            dateStart: dateFrom,
            dateEnd: dateTo,
            theme: $scope.event.theme.id,
            invites: $scope.invites
          };

          $http.post('http://localhost:5000/event', event, {headers: {token: $cookies.get('token')}}).then(function (res) {
            if (res.data.success) {
              $location.path('/event/' + res.data.eventId);
            } else {
              $scope.message = res.data.message;
            }
          });
        }
      } catch (err) {
        $scope.message = 'Please enter all forms';
      }
    };

    /*
     * Verifies that all user forms are filled in, otherwise it
     */
    function allForms() {
      var event = $scope.event;
      if (angular.isUndefined(event.name)) {
        $scope.message = 'What are you going to call your party? (Missing name)';
        return false;
      } else if (angular.isUndefined(event.location)) {
        $scope.message = 'You need somewhere to party (Missing location)';
        return false;
      } else if (angular.isUndefined(event.dateFrom.date) || angular.isUndefined(event.dateFrom.time)) {
        $scope.message = 'People need to know when to show up (Missing start date & time)';
        return false;
      } else if (angular.isUndefined(event.dateTo.date) || angular.isUndefined(event.dateTo.time)) {
        $scope.message = 'People need to know when to leave (Missing end date & time)';
        return false;
      } else if (angular.isUndefined(event.theme)) {
        $scope.message = 'Please enter a theme';
        return false;
      }

      return true;
    }
  }
};
