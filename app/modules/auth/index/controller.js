angular.module("GpApp.mAuth", [])
    .factory("LoginService", LoginService)
    .factory("AuthenticationService", AuthenticationService)
    .controller("LoginController", LoginController)
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/Login', {
                    templateUrl: './App/modules/auth/login/view.html',
                    controller: 'LoginController'
                });
        }
    ]);