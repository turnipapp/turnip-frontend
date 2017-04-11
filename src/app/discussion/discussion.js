module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $http, $cookies, jwtHelper) {
    var id = $stateParams.id;
    $scope.commenting = {};

    $scope.addComment = function (postId) {
      var obj = {
        comment: $scope.commenting.body
      };

      var url = 'http://localhost:5000/posts/' + postId + '/comment';

      $http.post(url, obj, {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          $scope.commenting = {};
          $http.get('http://localhost:5000/posts/' + id, {headers: {token: $cookies.get('token')}}).then(function (res) {
            $scope.posts = res.data.posts;
          });
        }
      });
    };

    $http.get('http://localhost:5000/event/' + id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      $scope.event = res.data.event;
      var themeId = $scope.event.theme;
      $http.get('http://localhost:5000/themes/' + themeId, {headers: {token: $cookies.get('token')}}).then(function (res) {
        $scope.image = res.data.theme.large;
      });

      $http.get('http://localhost:5000/user/id/' + $scope.event.owner, {headers: {token: $cookies.get('token')}}).then(function (res) {
        $scope.host = res.data;
        var tokenPayload = jwtHelper.decodeToken($cookies.get('token'));
        var currentLoggedInUserId = tokenPayload._id;
        $scope.isHost = currentLoggedInUserId === res.data.id;
      });

      $http.get('http://localhost:5000/posts/' + id, {headers: {token: $cookies.get('token')}}).then(function (res) {
        $scope.posts = res.data.posts;
        for (var i = 0; i < $scope.posts.length; i++) {
          $scope.posts[i].visible = false;
        }
      });
    });

    $scope.newPost = function () {
      $http.get('http://localhost:5000/account', {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          var images = [];
          var obj = {
            text: $scope.newPostContent,
            userId: res.data.id,
            eventId: $scope.event._id,
            images: images
          };

          $http.post('http://localhost:5000/posts/' + $scope.event._id, obj, {headers: {token: $cookies.get('token')}}).then(function (res) {
            if (res.data.success) {
              $scope.newPostContent = '';
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

    $scope.deletePost = function (id) {
      $http.delete('http://localhost:5000/posts/' + id, {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          $http.get('http://localhost:5000/posts/' + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
            $scope.posts = res.data.posts;
          });
        }
      });
    };

    $scope.like = function (post) {
      var token = $cookies.get('token');
      console.log(token);
      var body = {};
      $http.post('http://localhost:5000/posts/' + post._id + '/like', body, {headers: {token: token}}).then(function (res) {
        if (res.data.success) {
          post.likes = res.data.likes;
        }
      });
    };
  }
};
