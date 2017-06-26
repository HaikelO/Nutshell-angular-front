angular.module("GpApp.mEmployees", [])
  .factory("EmployeService", EmployeService)
  .factory("PersonnelService", PersonnelService)
  .controller("PersonnelController",PersonnelController)
  .controller("EmployeController",EmployeController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/Personnel', {
          templateUrl: '/App/modules/employees/index/view.html',
          controller: 'PersonnelController'
        }).
        when('/Personnel/:employeId', {
          templateUrl: './App/modules/employees/employe/view.html',
          controller: 'EmployeController'
        });
    }
  ]);
  
PersonnelController.$inject = ["$scope", "$http", "$sce", "PersonnelService", "EmployeService"];

function PersonnelController ($scope, $http, $sce, PersonnelService, EmployeService) {
  $scope.Personnel = PersonnelService.query();

  $scope.aPersonnel = function (obj){
    var data = angular.toJson(obj);

    $scope.Employe = EmployeService.save(data, function() {
      $scope.Personnel = PersonnelService.query();
      $scope.ajoutP = {};
      }
    );
  };

  $scope.sPersonnel = function (prod){
    $scope.Employe = EmployeService.EmployeService({employeId: prod._id}, function(){
        $scope.Personnel = PersonnelService.query();
    });
  };
}

EmployeController.$inject = ["$scope", "$http", "$routeParams", "$sce", "EmployeService"];

function EmployeController ($scope, $http, $routeParams, $sce, EmployeService) {
  $scope.Employe = EmployeService.query({employeId: $routeParams.employeId});
}
