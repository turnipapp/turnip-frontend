module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $cookies, $stateParams) {
    // Get's the list of songs added by users of the event
    function getLineup() {
      $http.get('http://localhost:5000/spotify/' + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          $scope.lineup = res.data.songs;
        }
      });
    }

    getLineup();

    // Gets the event details for use of the event name
    $http.get("http://localhost:5000/event/" + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.event = res.data.event;
      }
    });

    $scope.openInSpotify = function () {
      // Gets the spotify url
      $http.get("http://localhost:5000/spotify/" + $stateParams.id + '/url', {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          var win = window.open(res.data.url, '_blank');
          win.focus();
        }
      });
    };

    // Add songs to the event's playlist
    $scope.addSong = function (result) {
      var postBody = {
        track: result.track,
        artist: result.artist,
        album: result.album,
        eventId: $stateParams.id,
        songId: result.songId
      };
      $http.post('http://localhost:5000/spotify/' + $stateParams.id + '/addSong', postBody, {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          getLineup();
        }
      });
    };

    // Removes a song from the event's playlist
    $scope.removeSong = function (result) {
      var i = $scope.lineup.indexOf(result);
      if (i !== -1) {
        $scope.lineup.splice(i, 1);
      }

      $http.delete('http://localhost:5000/spotify/' + $stateParams.id + '/' + result.songId, {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (!res.data.success) {
          $scope.lineup.splice(i, 0, result);
        }
      });
    };

    // Function to live search
    $scope.results = [];
    var canSearch = true;
    $scope.$watch('search', function () {
      if (canSearch && angular.isDefined($scope.search) && $scope.search !== '') {
        canSearch = false;
        $http.get('http://localhost:5000/spotify/search/' + $scope.search, {headers: {token: $cookies.get('token')}}).then(function (res) {
          if (res.data.success) {
            canSearch = true;
            $scope.results = res.data.results;
          }
        });
      }
    });
  }
};
