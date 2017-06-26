VenteController.$inject = ["$scope", "$http", "$sce", "$routeParams", "VenteService", "ProduitsService"];

function VenteController ($scope, $http, $sce, $routeParams, VenteService, ProduitsService) {
    $scope.Vente = VenteService.query({ venteId:  $routeParams.venteId });
    $scope.Produits =  ProduitsService.query();
    $scope.Total = null;

    $scope.supprimerVente =  function (obj) {
        $scope.Vente = VenteService.delete({venteId : obj._id});
    };
    console.log($scope.Vente);
    $scope.Vente.$promise.then(function (result) {
        if(result.produits){
            
            angular.forEach(result.produits, function(value, key1){
                $scope.Total = $scope.Total + value.prix;
            });
        }
    });
}

