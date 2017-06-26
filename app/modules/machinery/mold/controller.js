MouleController.$inject = ["$scope", "$http", "$routeParams", "$sce", "MouleService", "MachineryService"];

function MouleController ($scope, $http, $routeParams, $sce, MouleService, MachineryService) {
  $scope.Moule = Moule.query({mouleId: $routeParams.mouleId});
  $scope.Machinery = MachineryService.query();
  $scope.modifiermoule = {};
  $scope.modifiermoule.Machinery = [];

  $scope.smMoule = function (obj){
    if(obj.id){
      $scope.modifiermoule.id = obj.id;
    }
    if(obj.name){
      $scope.modifiermoule.name = obj.name;
    }
    if(obj.type){
      $scope.modifiermoule.type = obj.type;
    }
    if(obj.empreinte){
      $scope.modifiermoule.empreinte = obj.empreinte;
    }
    if(obj.nombre_utilisation){
      $scope.modifiermoule.nombre_utilisation = obj.nombre_utilisation;
    }
    if(obj.poid){
      $scope.modifiermoule.poid = obj.poid;
    }
    if(obj.etat){
      $scope.modifiermoule.etat = obj.etat;
    }
    if(obj.description){
      $scope.modifiermoule.description = obj.description;
    }
    if(obj.fabricant){
      $scope.modifiermoule.fabricant = obj.fabricant;
    }
    if(obj.Machinery){
      $scope.modifiermoule.Machinery = obj.Machinery;
    }
    if(obj._id){
      $scope.modifiermoule._id = obj._id;
    }
    console.debug("modifier");
  };
  $scope.acMachine = function(){
        var obj = { id : null, name : null};
        $scope.modifiermoule.Machinery.push(obj);
        console.debug("Ajout Champ Machine");
  };

  $scope.rcMachine = function(){
      $scope.modifiermoule.Machinery = [];
  };

  $scope.mMoule = function (obj) {
    var data = JSON.stringify(obj);
    $scope.Moule = MouleService.save(data, function() {
      $scope.Moule = MouleService.query({mouleId: $routeParams.mouleId});
      $scope.modifiermoule =  {};
      }
    );
  };
  
}
