FacturationController.$inject = ["$location","$uibModal","FacturationService"];

function FacturationController ($location,$uibModal,FacturationService){
    vm = this;
    vm.status = "facture";
    FacturationService.getFactureList().then(function(data){
        vm.List = data;
    });
    vm.animationsEnabled = false;
    vm.checkstatus = function (obj){
        if(obj === "facture"){
            FacturationService.getFactureList().then(function(data){
                vm.List = data;
            });
        }else{
            FacturationService.getDevisList().then(function(data){
                vm.List = data;
            });
        }
    };
    vm.openFactureModal = function (){
        
      var modalInstance = $uibModal.open({
          animation: vm.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: '/cl/_modules/facturation/facture/modal/view.html',
          controller: 'FacturemodalController',
          controllerAs: 'vm'
        });

        modalInstance.result.then(function (obj) {
            
        });
    };
    vm.openDevisModal = function (){
        
      var modalInstance = $uibModal.open({
          animation: vm.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: '/cl/_modules/facturation/devis/modal/view.html',
          controller: 'DevismodalController',
          controllerAs: 'vm'
        });

        modalInstance.result.then(function (obj) {
            
        });
    };
    vm.devislist = function(){
        FacturationService.getDevisList().then(function(data){
            console.log(data);
            vm.List = data;
        });
    };
   
    vm.rechercheList = function(obj){
        
        FacturationService.getJourFactureList(obj).then(function(data){
            vm.List = data;
        });
    };
    vm.rechercheList2 = function(obj){
        
        FacturationService.getJourFactureList2(obj).then(function(data){
            vm.List = data;
        });
    };

    vm.factureAujourdhui = function () {
        FacturationService.getFactureList().then(function(data){
            vm.List = data;
        });
    };
    vm.factureMois = function () {
        FacturationService.getMoisFactureList().then(function(data){
            vm.List = data;
        });
    };
    vm.factureAnnee = function () {
        FacturationService.getAnneeFactureList().then(function(data){
            vm.List = data;
        });
    };
    vm.afficherFacture = function (obj) {
        $location.path("/Facture/"+obj._id);
    };
    vm.devisAujourdhui = function () {
        FacturationService.getDevisList().then(function(data){
            vm.List = data;
        });
    };
    vm.devisMois = function () {
        FacturationService.getMoisDevisList().then(function(data){
            vm.List = data;
        });
    };
    vm.devisAnnee = function () {
        FacturationService.getAnneeDevisList().then(function(data){
            vm.List = data;
        });
    };
    vm.afficherDevis = function (obj) {
        $location.path("/Devis/"+obj._id);
    };

}