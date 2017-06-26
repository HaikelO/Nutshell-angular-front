FournisseurController.$inject = ["$scope", "$http", "$routeParams", "$sce", "FournisseurService"];

function FournisseurController ($scope, $http, $routeParams, $sce, FournisseurService) {
  $scope.Fournisseur = FournisseurService.query({fournisseurId: $routeParams.fournisseurId});
}

