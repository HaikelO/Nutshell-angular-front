ProduitsController.$inject = ["$scope", "$http", "$sce", "ProduitsService", "ProduitService", "MatieresService"];

function ProduitsController($scope, $http, $sce, ProduitsService, ProduitService, MatieresService) {
  vm = this;
  vm.modifierproduit = {};
  vm.ajoutproduit = {};
  vm.ajoutproduit.nomenclature = {};
  vm.ajoutproduit.nomenclature.produits = [];
  vm.ajoutproduit.nomenclature.matieres = [];


  vm.Produits = ProduitsService.query();
  vm.Matieres = MatieresService.query();

  vm.acProduit = function () {
    var produitC = { id: null, qtt: null };
    vm.ajoutproduit.nomenclature.produits.push(produitC);
    console.debug("Ajout Champ Produit");
  };

  vm.rcProduit = function () {
    vm.ajoutproduit.nomenclature.produits = [];
  };

  vm.acMatiere = function () {
    var matiereC = { id: null, qtt: null };
    vm.ajoutproduit.nomenclature.matieres.push(matiereC);
    console.debug("Ajout Champ Matiere");
  };

  vm.rcMatiere = function () {
    vm.ajoutproduit.nomenclature.matieres = [];
  };

  vm.aProduit = function (obj) {
    var data = angular.toJson(vm.ajoutproduit);

    vm.Produit = ProduitService.save(data, function () {
      vm.Produits = ProduitsService.query();
      vm.ajoutproduit = {};
    }
    );
  };

  vm.amProduit = function () {
    console.debug("Annuler");
    vm.modifierproduit = {};
  };

  vm.smProduit = function (obj) {
    if (obj.id) {
      vm.modifierproduit.id = obj.id;
    }
    if (obj.name) {
      vm.modifierproduit.name = obj.name;
    }
    if (obj.qtt) {
      vm.modifierproduit.qtt = obj.qtt;
    }
    if (obj._id) {
      vm.modifierproduit._id = obj._id;
    }
    if (obj.nomenclature.produits) {
      vm.modifierproduit.nomenclature.produits = obj.nomenclature.produits;
    }
    if (obj.nomenclature.matieres) {
      vm.modifierproduit.nomenclature.matieres = obj.nomenclature.matieres;
    }
    if (obj.stock) {
      vm.modifierproduit.stock = obj.stock;
    }
    console.debug("modifier");
  };

  vm.mProduit = function (obj) {
    var data = JSON.stringify(obj);
    vm.Produit = ProduitService.save(data, function () {
      vm.Produits = ProduitsService.query();
      vm.ajoutproduit = {};
      vm.modifierproduit = {};
    }
    );
  };

  vm.sProduit = function (prod) {
    vm.Produit = ProduitService.delete({ produitId: prod._id }, function () {
      vm.Produits = ProduitsService.query();
    });
  };
}