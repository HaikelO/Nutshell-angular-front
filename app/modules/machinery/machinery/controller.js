MachineryController.$inject = ["$scope", "$http", "$sce", "MachineryService", "MachineService"];

function MachineryController($scope, $http, $sce, MachineryService, MachineService) {
  var vm = this;
  vm.Machinery = MachineryService.query();

  vm.aMachine = function (obj) {
    var data = angular.toJson(obj);

    vm.Machine = Machine.save(data, function () {
      vm.Machinery = MachineryService.query();
      vm.ajoutM = {};
    }
    );
  };
  vm.sMachine = function (prod) {
    var options = { 'Content-Type': 'application/x-www-form-urlencoded' };
    $http.delete("http://127.0.0.1:8080/api/Machine/" + prod._id, options).success(function (response) {
      vm.Machinery = MachineryService.query();
    });
  };
}