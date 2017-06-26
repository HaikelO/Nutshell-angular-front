

ClientController.$inject = ["$scope", "$http", "$routeParams", "$sce", "ClientService"];

function ClientController ($scope, $http, $routeParams, $sce, ClientService) {
  var vm = this;
  vm.Client = ClientService.query({clientId: $routeParams.clientId});
}