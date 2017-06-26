DevismodalController.$inject = ["$location","$uibModal","$uibModalInstance","autocservice","clientservice","produitservice","FacturationService"];

function DevismodalController ($location,$uibModal,$uibModalInstance,autocservice,clientservice,produitservice,FacturationService) {
    vm = this;
    vm.Produits = [];
    vm.simulateQuery = false;
    vm.isDisabled    = false;
    vm.thtp = "20%";
    vm.F = {};
    vm.F.client = {};
    vm.F.prix = {};
    vm.F.produits = [];
    vm.F.prix.ht = 0;
    vm.C = {};
    vm.C.client = {};
    vm.C.queryResults = [];
    vm.C.queryResults = listClient() || [];
    vm.querySearch   = querySearch;
    vm.querySearchproduits = querySearchproduits;
    vm.querySearchproduitsD = querySearchproduitsD;
    vm.P = {};
    vm.P.queryResults = [];
    vm.P.queryResults = listProduit() || [];
    vm.selectedCItemChange = selectedCItemChange();
    vm.selectedItemChange = autocservice.selectedItemChange();
    vm.searchTextChange   = autocservice.searchTextChange();
    vm.newState = autocservice.newState();
    
    vm.F.Produits = [];
    

    vm.ajouterChamp = function () {
        vm.Produits.push({});
    };
    vm.delChamp = function (obj){
        vm.Produits.splice(obj,1);
        tFacture();
    };
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    vm.totalFacture = function (obj) {
        if (obj.selectedItem){
            if (obj.selectedItem.prix && obj.quantite){
                obj.tttc = obj.selectedItem.prix.vente * obj.quantite;
                obj.ht = obj.selectedItem.prix.vente / 1.2;
                obj.ht = obj.ht.toFixed(2);
                tFacture();
                return obj;
            }
        }
    };
    function totalProduit(obj){
        var result = 
        console.log(result);
        return result;
    }
    vm.ok = function (data) {
        vm.FL = {};
        vm.FL.produits = [];
        vm.FL.prix = {};
        vm.FL.client = {};
        vm.FL.date = data.date;
        vm.FL.vendeur = "Admin";
        vm.FL.prix.ht = vm.F.prix.ht;
        vm.FL.prix.ttc = vm.F.prix.ttc;
        vm.FL.client = vm.C.selectedItem;
        vm.FL.client.id = vm.C.selectedItem.ref;
        vm.FL.client.nom  = vm.C.selectedItem.display;
       

        for(index = 0; index < vm.Produits.length; ++index)
        {
            
            vm.FL.produits.push({ref : vm.Produits[index].selectedItem.ref,garantie: {duree : vm.Produits[index].selectedItem.garantie.duree}, denomination : vm.Produits[index].selectedItem.denomination, quantite : vm.Produits[index].quantite, prix : { ttc : vm.Produits[index].selectedItem.prix.vente , ht : vm.Produits[index].selectedItem.prix.vente  / 1.2, tttc : vm.Produits[index].quantite * vm.Produits[index].selectedItem.prix.vente}});
        }
       
        FacturationService.setDevis(vm.FL).then(function(devis){
            $uibModalInstance.close();
            
            $location.path('/Devis/'+ devis._id);
            
        });
    };

    vm.newClient = function (){
        var modalInstance = $uibModal.open({
          animation: vm.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: '/cl/_modules/client/index.modal.view.client.html',
          controller: 'ClientmodalController',
          controllerAs: 'cCtrl'
        });

        modalInstance.result.then(function (obj) {
            vm.C.queryResults = listClient() || [];
        });
    };
    function selectedCItemChange(item){
        console.log(item);
       
    }
    function listClient() {
        var list = [];
        var obj = clientservice.getClients();
        
        obj.then(function(vari){
            for (index = 0; index < vari.length; ++index){
                list.push({
                    value: vari[index].nom.toLowerCase(),
                    display: vari[index].nom,
                    ref: vari[index].id,
                    tel:vari[index].tel,
                    mail:vari[index].mail,
                    adresse:vari[index].adresse,
                    cp:vari[index].cp,
                    pays:vari[index].pays,
                });
            }       
        });
        return list;
    }
    function listProduit() {
        var list = [];
        var obj = produitservice.getProduits();
        
        obj.then(function(vari){
            for (index = 0; index < vari.length; ++index){
                if(vari[index].prix && vari[index].garantie && vari[index].processeur && vari[index].ram && vari[index].stockage){
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination + " " + vari[index].processeur.valeur + "-" + vari[index].ram.taille + "Go-" +vari[index].stockage.taille +"Go",
                        prix : { vente: vari[index].prix.vente},
                        garantie : { duree : vari[index].garantie.duree}
                    });
                }
                else if (vari[index].prix && vari[index].garantie){
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination,
                        prix : { vente: vari[index].prix.vente},
                        garantie : { duree : vari[index].garantie.duree}
                    });
                }
                else if (vari[index].prix){
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination,
                        prix : { vente: vari[index].prix.vente}
                    });
                }
                else {
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination
                    });
                }

            }       
        });
        return list;
    }
    
    function querySearch (query, list) {
        var results = query ? vm.C.queryResults.filter( autocservice.createFilterFor(query) ) : vm.C.queryResults,
            deferred;
      
        return results;
      
    }
    function querySearchproduits (query, list) {
        var results = query ? vm.P.queryResults.filter( autocservice.createFilterFor(query) ) : vm.P.queryResults,
            deferred;
      
        return results;
      
    }
    function querySearchproduitsD (query, list) {
        var results = query ? vm.P.queryResults.filter( autocservice.createFilterForDisplay(query) ) : vm.P.queryResults,
            deferred;
      
        return results;
      
    }
    function tFacture() {
        vm.F.prix.ttc = 0;
        vm.F.prix.ht = 0;
        for(index = 0; index < vm.Produits.length; ++index)
        {
            vm.F.prix.ttc  = vm.F.prix.ttc  + vm.Produits[index].tttc;
            vm.F.prix.ht  = vm.F.prix.ttc  / 1.2;
            
        }
    }
    
}