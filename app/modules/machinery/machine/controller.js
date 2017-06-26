MachineController.$inject = ["$scope", "$http", "$routeParams", "$sce", "MachineService"];

function MachineController ($scope, $http, $routeParams, $sce, MachineService) {
  $scope.Machine = MachineService.query({machineId: $routeParams.machineId});
}