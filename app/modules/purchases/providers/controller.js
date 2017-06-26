FournisseursController.$inject = ["$scope", "$http", "$sce","FournisseursService","FournisseurService"];

function FournisseursController($scope, $http, $sce, FournisseursService, FournisseurService) {
  $scope.Fournisseurs = FournisseursService.query();

      $scope.aFournisseur = function (obj){
        var data = angular.toJson(obj);

        $scope.Fournisseur = Fournisseur.save(data, function() {
          $scope.Fournisseurs = FournisseursService.query();
          $scope.ajoutF = {};
          }
        );
      };
      $scope.aChampContact = function(){
			     var Contact = { adresse : null, name : null, phone : null, mail : null };
		       $scope.ajoutF.contact.push(Contact);
		  };

      $scope.sFournisseur = function (prod){
        $scope.Fournisseur = FournisseurService.delete({fournisseurId: prod._id}, function(){
           $scope.Fournisseurs = FournisseursService.query();
        });
      };
}