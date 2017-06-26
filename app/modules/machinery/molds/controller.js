MoulesController.$inject = ["$scope", "$http", "$sce", "MoulesService", "MouleService", "MachineryService"];

function MoulesController ($scope, $http, $sce, MoulesService, MouleService, MachineryService) {
  var vm = this;
  vm.Moules = MoulesService.query();
  vm.Machinery = MachineryService.query();
  vm.ajoutMoule = {};
  vm.ajoutMoule.Machinery = [];

  vm.aMoule = function (obj){
    var data = angular.toJson(obj);

    vm.Moule = MouleService.save(data, function() {
      vm.Moules = MoulesService.query();
      vm.ajoutMoule = {};
      }
    );
  };
  vm.sMoule = function (obj){
    var options = {'Content-Type': 'application/x-www-form-urlencoded'};
    $http.delete("http://127.0.0.1:8080/api/Moule/"+obj._id, options).success(function (response) {
      vm.Moules = MoulesService.query();
    });
  };
  vm.acMachine = function(){
      var obj = { id : null };
      vm.ajoutMoule.Machinery.push(obj);
      console.debug("Ajout Champ Machine");
  };

  vm.rcMachine = function(){
      vm.ajoutMoule.Machinery = [];
  };
}