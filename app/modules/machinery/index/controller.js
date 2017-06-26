angular.module("GpApp.mMachinery", [])
  .factory("MachineService", MachineService)
  .factory("MachineryService", MachineryService)
  .factory("MouleService", MouleService)
  .factory("MoulesService", MoulesService)
  .controller("MachineController", MachineController)
  .controller("MachineryController", MachineryController)
  .controller("MouleController", MouleController)
  .controller("MoulesController", MoulesController)
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when("/Machinery", {
          templateUrl: "./App/modules/machinery/machinery/view.html",
          controller: "MachineryController",
          controllerAs: "vm"
        }).
        when("/Machine/:machineId", {
          templateUrl: "./App/modules/machinery/machine/view.html",
          controller: "MachineController",
          controllerAs: "vm"
        }).
        when("/Moules", {
          templateUrl: "./App/modules/machinery/molds/view.html",
          controller: 'MoulesController',
          controllerAs: "vm"
        }).
        when("/Moule/:mouleId", {
          templateUrl: "./App/modules/machinery/mold/view.html",
          controller: "MouleController",
          controllerAs: "vm"
        });
    }
  ]);
