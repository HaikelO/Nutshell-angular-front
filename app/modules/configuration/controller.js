angular.module("GpApp.mConfiguration", [])
    .controller("ConfigurationController",ConfigurationController)
    .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/Configuration', {
            templateUrl: './App/modules/configuration/view.html',
            controller: 'ConfigurationController'
        });
        }
    ]);

ConfigurationController.$inject = ["$scope", "$http", "$sce"];

function ConfigurationController($scope, $http, $sce) {

}
