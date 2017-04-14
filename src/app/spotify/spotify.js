module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $http, $cookies, $stateParams) {
    function getLineup() {
      $http.get('http://localhost:5000/spotify/' + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          $scope.lineup = res.data.lineup;
        }
     });
    }

    getLineup();

    $http.get("http://localhost:5000/event/" + $stateParams.id, {headers: {token: $cookies.get('token')}}).then(function (res) {
      if (res.data.success) {
        $scope.event = res.data.event;
      }
    });

    $scope.results = [];
    $scope.searchSong = function () {
      //$scope.results = [{artist: "Eric Clapton", songName: "Shitty Song"}, {artist: "Shakey Graves", songName: "Noice"}, {artist: "Michael Jackson", songName: "Little Boys"}, {artist: "Adele", songName: "Shit IDK"}, {artist: "Pink Floyd", songName: "Wish You Weren't Here"}];
      $http.get('http://localhost:5000/spotify/search/' + $scope.search, {headers: {token: $cookies.get('token')}}).then(function (res) {
        if (res.data.success) {
          $scope.results = res.data.results;
        }
        });

      $scope.results = [];
      $scope.results.push($scope.search);
    };

    $scope.lineup = [];
    $scope.addSong = function (result) {
      $scope.lineup.push(result);

      var postBody = {
        eventId: $stateParams.id,
        songId: result.id
      }
       $http.post('http://localhost:5000/spotify/', postBody, {headers: {token: $cookies.get('token')}}).then(function (res) {
         if (res.data.success) {
           getLineup();
         }
       };

    $scope.removeSong = function (result) {
      var i = $scope.lineup.indexOf(result);
      if (i !== -1) {
        $scope.lineup.splice(i, 1);
      }
    };
  }
};
