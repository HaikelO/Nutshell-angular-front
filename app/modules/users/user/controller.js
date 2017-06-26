UserController.$inject = ["$scope", "$http", "$sce", "$routeParams", "UserService"];

function UserController ($scope, $http, $sce, $routeParams, UserService) {
  $scope.User = UserService.query({ userId : $routeParams.userId });
}

