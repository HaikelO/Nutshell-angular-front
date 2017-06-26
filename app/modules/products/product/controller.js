
  
ProduitController.$inject = ["$scope", "$http", "$routeParams", "ProduitService", "ProduitsService", "MatieresService"];

function ProduitController ($scope, $http, $routeParams, ProduitService, ProduitsService, MatieresService) {
  vm = this;

  vm.Produit2 = [];
  vm.modifierproduit = {};
  vm.modifierproduit.nomenclature = {};
  vm.modifierproduit.stock = [];
  vm.modifierproduit.nomenclature.produits = [];
  vm.modifierproduit.nomenclature.matieres = [];
  vm.Produit = {};
  vm.Produit.nomenclature={};
  vm.Produit.nomenclature.produits = [];
  vm.Produit.nomenclature.matieres = [];
  vm.Produit = ProduitService.query({produitId: $routeParams.produitId});
  vm.Produits = ProduitsService.query();
  vm.Matieres = MatieresService.query();

  vm.amProduit = function () {
    console.debug("Annuler");
    vm.modifierproduit = {};
  };

  vm.mProduit = function (obj) {
    var data = JSON.stringify(obj);
    vm.Produit = ProduitService.save(data, function() {
      vm.Produit = ProduitService.query({produitId: $routeParams.produitId});
      vm.modifierproduit =  {};
      }
    );
  };

  vm.smProduit = function (obj) {
    vm.modifierproduit._id = obj._id;
    vm.modifierproduit.id = obj.id;
    vm.modifierproduit.name = obj.name;
    vm.modifierproduit.qtt = obj.qtt;
    vm.modifierproduit.nomenclature.produits = obj.nomenclature.produits;
    vm.modifierproduit.nomenclature.matieres = obj.nomenclature.matieres;
    vm.modifierproduit.stock = obj.stock;
    console.debug("modifier");
  };

  vm.acProduit = function(){
        var produitC = { id : null, qtt : null };
        vm.modifierproduit.nomenclature.produits.push(produitC);
        console.debug("Ajout Champ Produit");
  };

  vm.rcProduit = function(){
      vm.modifierproduit.nomenclature.produits = [];
  };

  vm.acStock = function(){
        var stockC = { location : null, qtt : null };
        vm.modifierproduit.stock.push(stockC);
        console.debug("Ajout Champ Produit");
  };

  vm.rcStock = function(){
      vm.modifierproduit.nomenclature.stock = [];
  };

  vm.acMatiere = function(){
        var matiereC = { id : null, qtt : null };
        vm.modifierproduit.nomenclature.matieres.push(matiereC);
        console.debug("Ajout Champ Matiere");
  };

  vm.rcMatiere = function(){
      vm.modifierproduit.nomenclature.matieres = [];
  };

  function checkP ( ) {
    vm.Produit.$promise.then(function (result) {
      angular.forEach(result.nomenclature.produits, function(value1, key1){
        vm.Produits.$promise.then(function (result2) {
          console.log(result2);
          angular.forEach(result2, function(value2, key2) {
            if(value2.id === value1.id)
            {
              value1.name = value2.name;
              vm.Produit2.push(value1);
              return this;
            }
          });
        });
      });
      angular.forEach(vm.Produit.nomenclature.matieres, function(value11, key1){
        vm.Matieres.$promise.then(function (result22) {
          angular.forEach(result22, function(value22, key2) {
            if(value22.id === value11.id)
              {
                value11.name = value22.name;
                return this;
              }
          });
        });
      });
    });
  }
  checkP();
}


