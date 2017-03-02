module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $cookies, $http, $location) {
    $scope.hello = 'Hello World!';
    $scope.events = [
      {
        id: 0,
        image: 'https://scontent.xx.fbcdn.net/v/t31.0-8/15843978_10212114945698843_2971326378059451749_o.jpg?oh=72f7f5bd8c2f62e5ea0e3f687bb84473&oe=59092B08',
        title: 'Pre-hack-a-thon Party',
        address: '512 Vine St',
        date: 'Jan 17th, 2017',
        time: '9:00pm - 1:30am',
        response: 'yes'
      },
      {
        id: 1,
        image: 'https://scontent.xx.fbcdn.net/v/t1.0-9/14656371_10210103896586948_2679158948375682601_n.jpg?oh=540f7dce801c9bda9a1caba1580b0cbd&oe=5923ADEE',
        title: 'Halloween Rager',
        address: 'The Moosehead Lounge, 11 Grant St Apt 14',
        date: 'Jan 17th, 2017',
        time: '9:00pm - 1:30am',
        response: 'no'
      }
    ];

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
      } else {
        console.log("Go away, Hacker!");
      }
    };

    $scope.goToEvent = function (id) {
      $location.path('/event/' + id);
    };
  }
};
