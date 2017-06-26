angular.module("GpApp.mClients", [])
  .factory("ClientService", ClientService)
  .factory("ClientsService", ClientsService)
  .controller("ClientController",ClientController)
  .controller("ClientsController",ClientsController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/Clients', {
        templateUrl: './App/modules/clients/clients/view.html',
        controller: 'ClientsController',
        controllerAs: 'vm'
      }).
      when('/Client/:clientId', {
        templateUrl: './App/modules/clients/client/view.html',
        controller: 'ClientController',
        controllerAs: 'vm'        
      });
    }
  ]);