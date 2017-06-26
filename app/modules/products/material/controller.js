MatiereController.$inject = ["$scope", "$http", "$routeParams", "MatiereService", "FournisseursService"];

function MatiereController ($scope, $http, $routeParams, MatiereService, FournisseursService) {
  vm = this;

  vm.Matiere = MatiereService.query({matiereId: $routeParams.matiereId});
  vm.Fournisseurs = FournisseursService.query();
  vm.modifiermatiere = {};
  vm.modifiermatiere.fournisseurs = [];

  vm.smMatiere = function (obj){
    vm.modifiermatiere.id = obj.id;
    vm.modifiermatiere.name = obj.name;
    vm.modifiermatiere.qtt = obj.qtt;
    vm.modifiermatiere.fournisseurs = obj.fournisseurs;
    vm.modifiermatiere._id = obj._id;

    console.debug("modifier");
  };

  vm.mMatiere = function (obj) {
    var url = "http://127.0.0.1:8080/api/Matiere";
    var data = obj;
    data = JSON.stringify(data);
    var options = {'Content-Type': 'application/x-www-form-urlencoded'};
    $http.post(url, data, options).success(function (respo) {
      vm.modifiermatiere =  {};
      vm.Matiere = MatiereService.query({matiereId: $routeParams.matiereId});
    });
    console.debug("Sauvegarder");
  };
  vm.acFournisseur = function(){
        var obj = { id : null };
        vm.modifiermatiere.fournisseurs.push(obj);
        console.debug("Ajout Champ Fournisseur");
  };

  vm.rcFournisseur = function(){
      vm.modifiermatiere.fournisseurs = [];
  };

}


