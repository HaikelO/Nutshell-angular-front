angular.module("GpApp", ["ngSanitize","ngRoute","ngStorage","appServices","ngCookies","ngResource","appControllers","GpApp.mProducts","GpApp.mSales","GpApp.mPurchases","GpApp.mClients","GpApp.mAuth","GpApp.mEntrepot","GpApp.mEmployees","GpApp.mMachinery","GpApp.mTaches","GpApp.mConfiguration","GpApp.mUsers"]);

angular.module("GpApp").config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Users', {
        templateUrl: './App/modules/user/users.view.user.html',
        controller: 'UsersController'
      }).
      when('/User/:userId', {
        templateUrl: './App/modules/user/index.view.user.html',
        controller: 'UserController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
