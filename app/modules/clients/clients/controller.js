ClientsController.$inject = ["$scope", "$http", "$sce", "ClientService", "ClientsService"];

function ClientsController($scope, $http, $sce, ClientService, ClientsService) {
    var vm = this;

    vm.Clients = ClientsService.query();

    vm.aClient = function (obj) {
        var data = angular.toJson(obj);

        vm.Client = ClientService.save(data, function () {
            vm.Clients = ClientsService.query();
            vm.ajoutC = {};
        }
        );
    };
    vm.aChampContact = function () {
        var Contact = { adresse: null, name: null, phone: null, mail: null };
        vm.ajoutC.contact.push(Contact);
    };

    vm.sClient = function (prod) {
        vm.Client = ClientService.delete({ clientId: prod._id }, function () {
            vm.Clients = ClientsService.query();
        });
    };
}