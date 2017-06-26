angular.module('GpApp.mSales', [])
.factory("VenteService", VenteService)
.factory("VentesService", VentesService)
.controller("VenteController",VenteController)
.controller("VentesController",VentesController)
.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
        when('/Vente/:venteId', {
            templateUrl: './App/modules/sales/sale/view.html',
            controller: 'VenteController'
        }).
        when('/Ventes', {
            templateUrl: './App/modules/sales/index/view.html',
            controller: 'VentesController'
        });
    }
]);

VentesController.$inject = ["$scope", "$http", "$sce", "VenteService", "VentesService", "ClientsService", "ProduitsService"];

function VentesController ($scope, $http, $sce, VenteService, VentesService, ClientsService, ProduitsService) {
    $scope.Clients = ClientsService.query();
    $scope.Ventes = VentesService.query();
    $scope.Produits = ProduitsService.query();
    $scope.aVente =  {};
    $scope.aVente.produits = [];
    console.log("VentesCtrl");
    $scope.acProduit = function (){
        var obj = {id : null, qtt : null, prix: null};
        $scope.aVente.produits.push(obj); 
    };

    $scope.ajoutVente = function (obj){
        var data = angular.toJson($scope.aVente);
        
        $scope.Vente = VenteService.save(data, function(){
            $scope.aVente = {};
            $scope.Ventes = VentesService.query();
        });
    };
}