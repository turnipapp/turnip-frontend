module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams) {
    var id = $stateParams.id;
    $scope.id = id;
    $scope.hello = 'Hello Settings!';
  }
};
