angular.module("GpApp.mPurchases", [])
  .factory("AchatService", AchatService)
  .factory("AchatsService", AchatsService)
  .factory("FournisseurService", FournisseurService)
  .factory("FournisseursService", FournisseursService)
  .controller("AchatController", AchatController)
  .controller("AchatsController", AchatsController)
  .controller("FournisseurController", FournisseurController)
  .controller("FournisseursController", FournisseursController)
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/Achats', {
          templateUrl: './App/modules/purchases/purchases/view.html',
          controller: 'AchatsController',
          controllerAs: 'vm'
        }).
        when('/Achat/:achatId', {
          templateUrl: './App/modules/purchases/purchase/view.html',
          controller: 'AchatController',
          controllerAs: 'vm'
        }).
        when('/Fournisseurs', {
          templateUrl: './App/modules/purchases/providers/view.html',
          controller: 'FournisseursController',
          controllerAs: 'vm'
        }).
        when('/Fournisseur/:fournisseurId', {
          templateUrl: './App/modules/purchases/provider/view.html',
          controller: 'FournisseurController',
          controllerAs: 'vm'
        });
    }
  ]);


