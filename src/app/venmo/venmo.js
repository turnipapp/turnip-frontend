module.exports = {
  template: require('./index.html'),
  controller: function ($scope, $stateParams) {
    var id = $stateParams.id;
    $scope.id = id;
    $scope.hello = 'Hello Profile!';
    $scope.peoplePaid = [
      {
        name: 'Cole Johnson'
      },
      {
        name: 'Abigail Alderson'
      },
      {
        name: 'Keegan Irby'
      },
      {
        name: 'Kevin Cardona'
      },
      {
        name: 'Kyle Pollina'
      }
    ];
  }
};
