angular.module("GpApp.mTaches", [])
.controller("TachesController",TachesController)
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
       when('/Taches', {
        templateUrl: './App/modules/tache/index/view.html',
        controller: 'TachesController'
      });
    }
]);

TachesController.$inject = ["$scope", "$http", "$sce", "ProduitsService", "ProduitService", "MatieresService", "MatiereService"];

function TachesController ($scope, $http, $sce, ProduitsService, ProduitService, MatieresService, MatiereService) {
  $scope.Produits = ProduitsService.query();
  $scope.Matieres = MatieresService.query();

  $scope.fProduit = function (obj) {
    if(obj.produit.nomenclature.produits.length > 0)
    {
      //On parcourt la liste des produits dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.produits, function(value, key){

        //On parcourt la liste des produits
        angular.forEach($scope.Produits, function (value2, keys2) {

          //On compare l'id des produits dans la nomenclature avec les id de la liste des produits
          if(value.id === value2.id)
          {
            //Verification si stock suffisant pour la fabrication du produit
            if(obj.qtt * value.qtt > value2.qtt)
            {
              return console.debug("Pas de stock");
            }
          }
        });
      });
    }
    if (obj.produit.nomenclature.matieres.length > 0) {
      //On parcourt la liste des matieres dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.matieres, function(value, key){
        angular.forEach($scope.Matieres, function(value2, key2){
          if (value.id === value2.id) {
            if (obj.qtt * value.qtt > value2.qtt) {
              return console.debug("Pas de stock");
            }
          }
        });
      });
    }
    if(obj.produit.nomenclature.produits.length > 0)
    {

      //On parcourt la liste des produits dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.produits, function(value, key){

        //On parcourt la liste des produits
        angular.forEach($scope.Produits, function (value2, keys2) {

          //On compare l'id des produits dans la nomenclature avec les id de la liste des produits
          if(value.id === value2.id)
          {

            //Si le stock du produit existe on execute
            //Verification si stock suffisant pour la fabrication du produit
            if(obj.qtt * value.qtt < value2.qtt)
            {
              //On retire du stock les produits utilisés pour la fabrication
              value2.qtt = value2.qtt - obj.qtt * value.qtt;
              //On ajoute dans le stock le produit fabriqué
              if (obj.produit.qtt) {
                obj.produit.qtt = obj.produit.qtt + obj.qtt;
              }
              else {
                obj.produit.qtt = obj.qtt;
              }

              //Sauvegarde dans la base du stock
              $scope.Produit = ProduitService.save(obj.produit, function() {});
              $scope.Produit = ProduitService.save(value2, function() {});

            }

          }
        });
      });
    }
    if (obj.produit.nomenclature.matieres.length > 0) {
      //On parcourt la liste des matieres dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.matieres, function(value, key){
        angular.forEach($scope.Matieres, function(value2, key2){
          if (value.id === value2.id) {
            if (obj.qtt * value.qtt < value2.qtt) {
              //On retire du stock les matieres utiliser pour la fabrication
              value2.qtt = value2.qtt - obj.qtt * value.qtt;
              //On ajoute dans le stock le produit fabriquer
              if (obj.produit.qtt) {
                obj.produit.qtt = obj.produit.qtt + obj.qtt;
              }
              else {
                obj.produit.qtt = obj.qtt;
              }
              $scope.Produit = ProduitService.save(obj.produit, function() {});
              $scope.Matiere = MatiereService.save(value2, function() {});
            }
          }
        });
      });
    }

  };
}
