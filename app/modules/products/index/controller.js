angular.module("GpApp.mProducts", [])
  .factory("ProduitService", ProduitService)
  .factory("ProduitsService", ProduitsService)
  .factory("MatiereService", MatiereService)
  .factory("MatieresService", MatieresService)
  .controller("ProduitsController", ProduitsController)
  .controller("ProduitController", ProduitController)
  .controller("MatiereController", MatiereController)
  .controller("MatieresController", MatieresController)
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/Products', {
          templateUrl: './App/modules/products/products/view.html',
          controller: 'ProduitsController',
          controllerAs: 'vm'
        }).
        when('/Produit/:produitId', {
          templateUrl: '/App/modules/products/product/view.html',
          controller: 'ProduitController',
          controllerAs: 'vm'
        }).
        when('/Matieres', {
          templateUrl: './App/modules/products/materials/view.html',
          controller: 'MatieresController',
          controllerAs: 'vm'
        }).
        when('/Matiere/:matiereId', {
          templateUrl: './App/modules/products/material/view.html',
          controller: 'MatiereController',
          controllerAs: 'vm'
        });
    }
  ]);