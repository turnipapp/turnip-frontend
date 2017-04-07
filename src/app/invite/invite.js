module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams, $http) {
    var id = $stateParams.id;
    console.log(id);
    $scope.hello = id;
    $http.get("http://localhost:5000/").then(function (res) {
      if (res.data.success) {
        console.log("success");
      }
    });
  }
};
