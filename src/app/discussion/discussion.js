module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $http, $cookies, jwtHelper, Upload) {
    var id = $stateParams.id;
    $scope.commenting = {};
    $scope.loading = {
      newPost: false
    };

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
      var body = {};
      $http.post('http://localhost:5000/posts/' + post._id + '/like', body, {headers: {token: token}}).then(function (res) {
        if (res.data.success) {
          post.likes = res.data.likes;
        }
      });
    };

    $scope.guests = [];
    $http.get("http://localhost:5000/event/" + $stateParams.id + "/guests", {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.guests = res.data.guests;
      }
    });

    $scope.tags = [];
    $scope.$watch('newPostContent', function () {
      if (angular.isDefined($scope.newPostContent) && $scope.newPostContent.substring(lastTag - 1).includes('@')) {
        var indexOfAt = $scope.newPostContent.indexOf('@', lastTag);
        var afterAt = $scope.newPostContent.substring(indexOfAt + 1);
        var tagString;
        if (afterAt.includes(' ')) {
          tagString = afterAt.substring(0, afterAt.indexOf(' '));
        } else {
          tagString = afterAt;
        }
        if (tagString.length > 0) {
          $scope.tags = [];
          for (var i = 0; i < $scope.guests.length; i++) {
            var fullName = $scope.guests[i].firstName + " " + $scope.guests[i].lastName;
            var lc = fullName.toLowerCase();
            if (lc.includes(tagString.toLowerCase())) {
              $scope.tags.push($scope.guests[i]);
            }
          }
        } else {
          $scope.tags = $scope.guests;
        }
      } else {
        $scope.tags = [];
      }
    });

    var tagged = [];
    var lastTag = 0;
    $scope.addTag = function (user) {
      for (var i = $scope.newPostContent.length - 1; i >= lastTag; i--) {
        if ($scope.newPostContent.charAt(i) === '@') {
          var nameStart = i + 1;
          var fullName = user.firstName + " " + user.lastName;
          $scope.newPostContent = $scope.newPostContent.substring(0, nameStart);
          $scope.newPostContent += fullName;
          $scope.tags = [];
          lastTag = i + fullName.length;
          tagged.push(user);
        }
      }
    };

    function verifyTags(string, tags) {
      for (var i = 0; i < tags.length; i++) {
        var count = (string.match(/is/g) || []).length;
        if (count === -1) {
          tags.splice(i, 1);
        }
      }
    }

    $scope.newPost = function () {
      $scope.loading.newPost = true;
      $http.get('http://localhost:5000/account', {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          var images = [];
          verifyTags($scope.newPostContent, tagged);
          var obj = {
            text: $scope.newPostContent,
            userId: res.data.id,
            eventId: $scope.event._id,
            images: images,
            tags: tagged
          };

          $http.post('http://localhost:5000/posts/' + $scope.event._id, obj, {headers: {token: $cookies.get('token')}}).then(function (res) {
            if (res.data.success) {
              $scope.newPostContent = '';
              $http.get('http://localhost:5000/posts/' + $scope.event._id, {headers: {token: $cookies.get('token')}}).then(function (res) {
                if (res.data.success) {
                  $scope.loading.newPost = false;
                  $scope.posts = res.data.posts;
                  $scope.tags = [];
                  lastTag = 0;
                }
              });
            }
          });
        }
      });
    };

    $scope.uploadFiles = function (file) {
      $scope.f = file;
      $scope.loading.newPost = true;
      var url = "http://localhost:5000/upload/" + id;
      file.upload = Upload.upload({
        url: url,
        method: 'POST',
        headers: {
          token: $cookies.get('token')
        },
        file: file
      });

      file.upload.then(function (res) {
        if (res.data.success) {
          $http.get('http://localhost:5000/posts/' + $scope.event._id, {headers: {token: $cookies.get('token')}}).then(function (getRes) {
            if (getRes.data.success) {
              $scope.loading.newPost = false;
              $scope.posts = getRes.data.posts;
              $scope.tags = [];
              lastTag = 0;
            }
          });
        }
      });
    };
  }
};
