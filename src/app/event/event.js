module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams) {
    var id = $stateParams.id;
    $scope.hello = 'Hello Event! ' + id;
  }
};
