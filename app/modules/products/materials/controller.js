MatieresController.$inject = ["$scope", "$http", "$sce", "MatieresService", "MatiereService", "FournisseursService"];

function MatieresController ($scope, $http, $sce, MatieresService, MatiereService, FournisseursService) {

  vm = this;
  vm.ajoutMatiere = {};
  vm.ajoutMatiere.fournisseurs = [];
  vm.Fournisseurs = FournisseursService.query();

  vm.aMatiere = function (obj){
    var data = angular.toJson(obj);
    console.debug("Ajouter");
    vm.Matiere = MatiereService.save(data, function() {
      vm.Matieres = MatieresService.query();
      vm.ajoutF = {};
      }
    );
  };
  vm.amMatiere = function (){
    console.debug("Annuler");
    vm.modifiermatiere = {};
  };
  vm.smMatiere = function (obj){
    if(obj.id){
      vm.modifiermatiere.id = obj.id;
    }
    if(obj.name){
      vm.modifiermatiere.name = obj.name;
    }
    if(obj.qtt){
      vm.modifiermatiere.qtt = obj.qtt;
    }
    if(obj.fournisseurs){
      vm.modifiermatiere.fournisseurs = obj.fournisseurs;
    }
    if(obj._id){
      vm.modifiermatiere._id = obj._id;
    }
    console.debug("modifier");
  };

  vm.mMatiere = function (obj) {
    var url = "http://127.0.0.1:8080/api/Matiere";
    var data = obj;
    data = JSON.stringify(data);
    var options = {'Content-Type': 'application/x-www-form-urlencoded'};
    $http.post(url, data, options).success(function (respo) {
      vm.Matieres = MatieresService.query();
      vm.ajoutMatiere = {};
      vm.modifiermatiere =  {};
    });
    console.debug("Sauvegarder");
  };

  vm.sMatiere = function (prod){
    vm.Matiere = MatiereService.delete({matiereId: prod._id}, function(){
        vm.Matieres = MatieresService.query();
    });
  };
  vm.acFournisseur = function(){
        var obj = { id : null };
        vm.ajoutMatiere.fournisseurs.push(obj);
        console.debug("Ajout Champ Fournisseur");
  };

  vm.rcFrounisseur = function(){
      vm.ajoutMatiere.fournisseurs = [];
  };
  // $http.get("http://127.0.0.1:8080/api/Matieres").success(function (response) {
  //   $scope.Matieres = response;
  // });
  vm.Matieres = MatieresService.query();

}
