module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $http, $cookies) {
    $scope.hello = "hi";
    // $scope.posts = [
    //   {
    //     text: 'Hello',
    //     author: 'Cole Johnson',
    //     date: '12:00 pm'
    //   },
    //   {
    //     text: 'I\'m so excited',
    //     author: 'Kyle Pollina',
    //     date: '3:30 am'
    //   },
    //   {
    //     text: 'It\'s lit',
    //     author: 'Kevin Cardona',
    //     date: '7:00 pm'
    //   }
    // ];
    var id = $stateParams.id;

    $http.get('http://localhost:5000/event/' + id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      $scope.event = res.data.event;
      var themeId = $scope.event.theme;
      $http.get('http://localhost:5000/themes/' + themeId, {headers: {token: $cookies.get('token')}}).then(function (res) {
        $scope.image = res.data.theme.large;
      });

      $http.get('http://localhost:5000/user/id/' + $scope.event.owner, {headers: {token: $cookies.get('token')}}).then(function (res) {
        $scope.host = res.data;
      });

      $http.get('http://localhost:5000/posts/' + id, {headers: {token: $cookies.get('token')}}).then(function (res) {
        $scope.posts = res.data.posts;
      });
    });

    $scope.newPost = function () {
      $http.get('http://localhost:5000/account', {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          //TODO: Create add image section to post
          var images = [];
          var obj = {
            text: $scope.newPostContent,
            userId: res.data.id,
            eventId: $scope.event._id,
            images: images
          };

          $http.post('http://localhost:5000/posts/' + $scope.event._id, obj, {headers: {token: $cookies.get('token')}}).then(function (res) {
            if (res.data.success) {
              $http.get('http://localhost:5000/posts/' + $scope.event._id, {headers: {token: $cookies.get('token')}}).then(function (res) {
                if (res.data.success) {
                  $scope.posts = res.data.posts;
                }
              });
            }
          });
        }
      });
    };
  }
};
