module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $http, $state) {
    var id = $stateParams.id;

    $http.get("http://localhost:5000/invite/" + id).then(function (res) {
      $scope.info = res.data;
    });

    $scope.sendResponse = function (status) {
      var obj = {
        inviteResponse: status
      };

      $http.put("http://localhost:5000/invite/" + id, obj).then(function (res) {
        if (res.data.success) {
          $state.go('app.events');
        }
      });
    };
  }
};
