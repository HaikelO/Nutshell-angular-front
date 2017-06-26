AchatsController.$inject = ["$scope", "$http", "$sce", "AchatsService", "AchatService", "FournisseursService", "ProduitsService", "MatieresService", "EtatsService"];

function AchatsController($scope, $http, $sce, AchatsService, AchatService, FournisseursService, ProduitsService, MatieresService, EtatsService) {
  var vm = this;
  
  vm.Achats = AchatsService.query();
  vm.Fournisseurs = FournisseursService.query();
  vm.Produits = ProduitsService.query();
  vm.Matieres = MatieresService.query();
  vm.Etats = EtatsService.get();

  vm.aAchat = function (obj) {
    var data = angular.toJson(obj);
    vm.Achat = AchatService.save(data, function () {
      vm.Achats = AchatsService.query();
      vm.ajoutA = {};
    });
  };
}