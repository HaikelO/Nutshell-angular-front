angular.module("GpApp.mUsers", [])
  .factory("UserService",UserService)
  .factory("UsersService",UsersService)
  .controller("UserController",UserController)
  .controller("UsersController",UsersController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/Users', {
          templateUrl: './App/modules/users/index/view.html',
          controller: 'UsersController'
        }).
        when('/User/:userId', {
          templateUrl: './App/modules/users/user/view.html',
          controller: 'UserController'
        });
    }
  ]);

UsersController.$inject = ["$scope", "$http", "$sce", "UsersService", "UserService"];

function UsersController ($scope, $http, $sce, UsersService, UserService) {
  $scope.Users = UsersService.query();

  $scope.sUser = function(obj) {
    console.log("del");
    $scope.User = UserService.delete({ userId : obj._id }, function(){
        $scope.Users = UsersService.query();
        console.log("del ok");
    });
  };
  $scope.aUser = function(obj){
    var data = angular.toJson(obj);

    $scope.User = UserService.save(data, function(){
      $scope.ajoutU = {};
      $scope.Users = UsersService.query();
    });
  };
}