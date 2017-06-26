LoginController.$inject = ["$scope", "$http", "$sce", "$cookieStore", "$location", "LoginService", "AuthenticationService"];

function LoginController($scope, $http, $sce, $cookieStore, $location, LoginService, AuthenticationService) {
  $scope.login = function (obj) {
    //$cookieStore.put('loginState','up');
    if (obj !== undefined) {
      var nam = $scope.log.name;
      var pass = $scope.log.password;
      //console.log(obj);
      console.log(nam);
      if (obj.password !== undefined && obj.name !== undefined) {
        // $scope.Login = Login.up(data, function(){
        //
        // });
        AuthenticationService.Login(nam, pass, function (result) {
          if (result === true) {
            return $location.path('/Produits');
          } else {

          }
        });
      }
    }
  };
}
