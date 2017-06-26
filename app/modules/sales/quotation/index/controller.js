DevisController.$inject= ["$routeParams", "FacturationService"];

function DevisController ($routeParams, FacturationService) {
    var vm = this;
    vm.devis = {};
    FacturationService.getDevis($routeParams.id).then(function(devis){
        console.log("Devis:",devis);
      vm.devis = devis;
    });
    vm.generatePDF = function (){
        var pdf = new jsPDF('p','pt','a4');
        var options = { pagesplit: true };
         pdf.addHTML($('#devisPDF'),15,15,{
					'background': '#fff',
					'width': 1800, 
                    'height': 1800, 
   			 },function() {
             /*pdf.save(fCtrl.devis.numero + '.pdf');*/
            pdf.autoPrint();
            window.open(pdf.output('datauristring'));
         });
    };

   vm.generatePDF2 = function () {
        var doc = new jsPDF('a4');

        // We'll make our own renderer to skip this editor
        var specialElementHandlers = {
            '#editor': function(element, renderer){
                return true;
            }
        };

        // All units are in the set measurement for the document
        // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
        doc.fromHTML($('#devisPDF').html(),15,15, {
            /*'width': 170,*/ 
            'elementHandlers': specialElementHandlers
        },function(){
            doc.autoPrint();
            window.open(doc.output('datauristring'));
        });

    };
  }