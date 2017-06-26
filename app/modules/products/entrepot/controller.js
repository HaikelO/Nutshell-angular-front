angular.module("GpApp.mEntrepot", [])
  .controller("EntrepotController",EntrepotController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when("/Entrepot", {
          templateUrl: "./App/modules/products/entrepot/view.html",
          controller: "EntrepotController",
          controllerAs :"vm"
        });
    }
  ]);

EntrepotController.$inject = ["$scope", "$http", "$sce","MatieresService", "ProduitsService"];

function EntrepotController ($scope, $http, $sce, MatieresService, ProduitsService) {
  var vm = this;
  vm.Stock = [ { name : "PVC", QTT: 7}, {name : "PVC2", QTT: 5}];
  vm.Matieres = MatieresService.query();
  vm.Produits = ProduitsService.query();

}
