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

LoginService.$inject = ["$resource"];

function LoginService($resource) {
  return $resource('', {}, {
    up: { method: 'POST', url: "/api/Login", 'Content-Type': 'application/x-www-form-urlencoded' }
  });
}

AuthenticationService.$inject = ["$http", "$localStorage"];

function AuthenticationService($http, $localStorage) {
  return {
    Login: Login,
    Logout: Logout
  };

  function Login(username, password, callback) {
    console.log(username, password);
    $http({ url: '/api/Login', method: 'POST', data: { name: username, password: password }, 'Content-Type': 'application/x-www-form-urlencoded' })
      .then(function (response) {
        // login successful if there's a token in the response
        console.log("success");
        console.log(response);
        if (response.token) {
          var data = angular.toJson(response.token);
          console.log(data);
          // store username and token in local storage to keep user logged in between page refreshes
          $localStorage.currentUser = { username: username, token: response.token };
          console.log($localStorage.currentUser.token);
          // add jwt token to auth header for all requests made by the $http service
          $http.defaults.headers.Authorization = data.token;

          // execute callback with true to indicate successful login
          return callback(true);
        } else {
          // execute callback with false to indicate failed login
          callback(false);
        }
      });
  }

  function Logout() {
    // remove user from local storage and clear http auth header
    delete $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = '';
  }
}


ClientController.$inject = ["$scope", "$http", "$routeParams", "$sce", "ClientService"];

function ClientController ($scope, $http, $routeParams, $sce, ClientService) {
  var vm = this;
  vm.Client = ClientService.query({clientId: $routeParams.clientId});
}
ClientService.$inject = ["$resource","$localStorage"];

function ClientService ($resource,$localStorage) {
  return $resource('',{clientId:'@id'},{
    query: { method : 'GET', url : "/api/Client/:clientId"},
    save : { method: 'POST', url: "/api/Client", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Client/:clientId"}
  });
}

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
angular.module("GpApp.mClients", [])
  .factory("ClientService", ClientService)
  .factory("ClientsService", ClientsService)
  .controller("ClientController",ClientController)
  .controller("ClientsController",ClientsController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/Clients', {
        templateUrl: './App/modules/clients/clients/view.html',
        controller: 'ClientsController',
        controllerAs: 'vm'
      }).
      when('/Client/:clientId', {
        templateUrl: './App/modules/clients/client/view.html',
        controller: 'ClientController',
        controllerAs: 'vm'        
      });
    }
  ]);
ClientsService.$inject = ["$resource","$localStorage"];

function ClientsService ($resource,$localStorage) {
    return $resource('', {}, {
        query: { method : 'GET', url: "/api/Clients", isArray : true}
    });
}
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

PersonnelService.$inject = ["$resource","$localStorage"];

function PersonnelService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method : 'GET', url: "/api/Personnel", isArray:true}
  });
}

EmployeService.$inject = ["$resource","$localStorage"];

function EmployeService ($resource,$localStorage) {
  return $resource('',{employeId:'@id'},{
    query: { method : 'GET', url : "/api/Employe/:employeId"},
    save : { method: 'POST', url: "/api/Employe", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Employe/:employeId"}
  });
}

EtatsService.$inject = [];

function EtatsService () {
    return {
            get : function(){
                this.etatTableau = [
                        {id : "1", name : "Devis"},
                        {id : "2", name : "En cours de traitement"},
                        {id : "3", name : "Terminé"}
                    ];
                return this.etatTableau;
            }
        };
}
/* Controllers */

angular.module('appControllers', []);



/* Services */

angular.module('appServices', [])
.factory("EtatsService", EtatsService);



angular.module("GpApp.mMachinery", [])
  .factory("MachineService", MachineService)
  .factory("MachineryService", MachineryService)
  .factory("MouleService", MouleService)
  .factory("MoulesService", MoulesService)
  .controller("MachineController", MachineController)
  .controller("MachineryController", MachineryController)
  .controller("MouleController", MouleController)
  .controller("MoulesController", MoulesController)
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when("/Machinery", {
          templateUrl: "./App/modules/machinery/machinery/view.html",
          controller: "MachineryController",
          controllerAs: "vm"
        }).
        when("/Machine/:machineId", {
          templateUrl: "./App/modules/machinery/machine/view.html",
          controller: "MachineController",
          controllerAs: "vm"
        }).
        when("/Moules", {
          templateUrl: "./App/modules/machinery/molds/view.html",
          controller: 'MoulesController',
          controllerAs: "vm"
        }).
        when("/Moule/:mouleId", {
          templateUrl: "./App/modules/machinery/mold/view.html",
          controller: "MouleController",
          controllerAs: "vm"
        });
    }
  ]);

MachineryService.$inject = ["$resource","$localStorage"];

function MachineryService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method:'GET', url: "/api/Machinery", isArray : true}
  });
}
MachineController.$inject = ["$scope", "$http", "$routeParams", "$sce", "MachineService"];

function MachineController ($scope, $http, $routeParams, $sce, MachineService) {
  $scope.Machine = MachineService.query({machineId: $routeParams.machineId});
}
MachineService.$inject = ["$resource","$localStorage"];

function MachineService ($resource,$localStorage) {
  return $resource('/Machine/:machineId',{MachineryId:'@id'},{
    query : { method : 'GET', url : "/api/Machine/:machineId"},
    save : { method: 'POST', url: "/api/Machine", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Machine/:machineId"}
  });
}


MachineryController.$inject = ["$scope", "$http", "$sce", "MachineryService", "MachineService"];

function MachineryController($scope, $http, $sce, MachineryService, MachineService) {
  var vm = this;
  vm.Machinery = MachineryService.query();

  vm.aMachine = function (obj) {
    var data = angular.toJson(obj);

    vm.Machine = Machine.save(data, function () {
      vm.Machinery = MachineryService.query();
      vm.ajoutM = {};
    }
    );
  };
  vm.sMachine = function (prod) {
    var options = { 'Content-Type': 'application/x-www-form-urlencoded' };
    $http.delete("http://127.0.0.1:8080/api/Machine/" + prod._id, options).success(function (response) {
      vm.Machinery = MachineryService.query();
    });
  };
}
MouleController.$inject = ["$scope", "$http", "$routeParams", "$sce", "MouleService", "MachineryService"];

function MouleController ($scope, $http, $routeParams, $sce, MouleService, MachineryService) {
  $scope.Moule = Moule.query({mouleId: $routeParams.mouleId});
  $scope.Machinery = MachineryService.query();
  $scope.modifiermoule = {};
  $scope.modifiermoule.Machinery = [];

  $scope.smMoule = function (obj){
    if(obj.id){
      $scope.modifiermoule.id = obj.id;
    }
    if(obj.name){
      $scope.modifiermoule.name = obj.name;
    }
    if(obj.type){
      $scope.modifiermoule.type = obj.type;
    }
    if(obj.empreinte){
      $scope.modifiermoule.empreinte = obj.empreinte;
    }
    if(obj.nombre_utilisation){
      $scope.modifiermoule.nombre_utilisation = obj.nombre_utilisation;
    }
    if(obj.poid){
      $scope.modifiermoule.poid = obj.poid;
    }
    if(obj.etat){
      $scope.modifiermoule.etat = obj.etat;
    }
    if(obj.description){
      $scope.modifiermoule.description = obj.description;
    }
    if(obj.fabricant){
      $scope.modifiermoule.fabricant = obj.fabricant;
    }
    if(obj.Machinery){
      $scope.modifiermoule.Machinery = obj.Machinery;
    }
    if(obj._id){
      $scope.modifiermoule._id = obj._id;
    }
    console.debug("modifier");
  };
  $scope.acMachine = function(){
        var obj = { id : null, name : null};
        $scope.modifiermoule.Machinery.push(obj);
        console.debug("Ajout Champ Machine");
  };

  $scope.rcMachine = function(){
      $scope.modifiermoule.Machinery = [];
  };

  $scope.mMoule = function (obj) {
    var data = JSON.stringify(obj);
    $scope.Moule = MouleService.save(data, function() {
      $scope.Moule = MouleService.query({mouleId: $routeParams.mouleId});
      $scope.modifiermoule =  {};
      }
    );
  };
  
}

MouleService.$inject = ["$resource","$localStorage"];

function MouleService ($resource,$localStorage) {
  return $resource('',{ mouleId:'@id' },{
    query: { method: 'GET', url : "/api/Moule/:mouleId"},
    save : { method: 'POST', url: "/api/Moule", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Moule/:mouleId"}
  });
}

MoulesController.$inject = ["$scope", "$http", "$sce", "MoulesService", "MouleService", "MachineryService"];

function MoulesController ($scope, $http, $sce, MoulesService, MouleService, MachineryService) {
  var vm = this;
  vm.Moules = MoulesService.query();
  vm.Machinery = MachineryService.query();
  vm.ajoutMoule = {};
  vm.ajoutMoule.Machinery = [];

  vm.aMoule = function (obj){
    var data = angular.toJson(obj);

    vm.Moule = MouleService.save(data, function() {
      vm.Moules = MoulesService.query();
      vm.ajoutMoule = {};
      }
    );
  };
  vm.sMoule = function (obj){
    var options = {'Content-Type': 'application/x-www-form-urlencoded'};
    $http.delete("http://127.0.0.1:8080/api/Moule/"+obj._id, options).success(function (response) {
      vm.Moules = MoulesService.query();
    });
  };
  vm.acMachine = function(){
      var obj = { id : null };
      vm.ajoutMoule.Machinery.push(obj);
      console.debug("Ajout Champ Machine");
  };

  vm.rcMachine = function(){
      vm.ajoutMoule.Machinery = [];
  };
}
MoulesService.$inject = ["$resource","$localStorage"];

function MoulesService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method : 'GET', url: "/api/Moules", isArray: true}
  });
}

angular.module("GpApp.mEntrepot", [])
  .controller("EntrepotController",EntrepotController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when("/Entrepot", {
          templateUrl: "./App/modules/products/entrepot/view.html",
          controller: "EntrepotController",
          controllerAs :"vm"
        });
    }
  ]);

EntrepotController.$inject = ["$scope", "$http", "$sce","MatieresService", "ProduitsService"];

function EntrepotController ($scope, $http, $sce, MatieresService, ProduitsService) {
  var vm = this;
  vm.Stock = [ { name : "PVC", QTT: 7}, {name : "PVC2", QTT: 5}];
  vm.Matieres = MatieresService.query();
  vm.Produits = ProduitsService.query();

}

angular.module("GpApp.mProducts", [])
  .factory("ProduitService", ProduitService)
  .factory("ProduitsService", ProduitsService)
  .factory("MatiereService", MatiereService)
  .factory("MatieresService", MatieresService)
  .controller("ProduitsController", ProduitsController)
  .controller("ProduitController", ProduitController)
  .controller("MatiereController", MatiereController)
  .controller("MatieresController", MatieresController)
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/Products', {
          templateUrl: './App/modules/products/products/view.html',
          controller: 'ProduitsController',
          controllerAs: 'vm'
        }).
        when('/Produit/:produitId', {
          templateUrl: '/App/modules/products/product/view.html',
          controller: 'ProduitController',
          controllerAs: 'vm'
        }).
        when('/Matieres', {
          templateUrl: './App/modules/products/materials/view.html',
          controller: 'MatieresController',
          controllerAs: 'vm'
        }).
        when('/Matiere/:matiereId', {
          templateUrl: './App/modules/products/material/view.html',
          controller: 'MatiereController',
          controllerAs: 'vm'
        });
    }
  ]);

ProduitsService.$inject = ["$resource", "$localStorage"];

function ProduitsService($resource, $localStorage) {
  return $resource('', {}, {
    query: { method: 'GET', url: "/api/products", isArray: true }
  });
}


MatiereController.$inject = ["$scope", "$http", "$routeParams", "MatiereService", "FournisseursService"];

function MatiereController ($scope, $http, $routeParams, MatiereService, FournisseursService) {
  vm = this;

  vm.Matiere = MatiereService.query({matiereId: $routeParams.matiereId});
  vm.Fournisseurs = FournisseursService.query();
  vm.modifiermatiere = {};
  vm.modifiermatiere.fournisseurs = [];

  vm.smMatiere = function (obj){
    vm.modifiermatiere.id = obj.id;
    vm.modifiermatiere.name = obj.name;
    vm.modifiermatiere.qtt = obj.qtt;
    vm.modifiermatiere.fournisseurs = obj.fournisseurs;
    vm.modifiermatiere._id = obj._id;

    console.debug("modifier");
  };

  vm.mMatiere = function (obj) {
    var url = "http://127.0.0.1:8080/api/Matiere";
    var data = obj;
    data = JSON.stringify(data);
    var options = {'Content-Type': 'application/x-www-form-urlencoded'};
    $http.post(url, data, options).success(function (respo) {
      vm.modifiermatiere =  {};
      vm.Matiere = MatiereService.query({matiereId: $routeParams.matiereId});
    });
    console.debug("Sauvegarder");
  };
  vm.acFournisseur = function(){
        var obj = { id : null };
        vm.modifiermatiere.fournisseurs.push(obj);
        console.debug("Ajout Champ Fournisseur");
  };

  vm.rcFournisseur = function(){
      vm.modifiermatiere.fournisseurs = [];
  };

}



MatiereService.$inject = ["$resource","$localStorage"];

function MatiereService ($resource,$localStorage) {
  return $resource('/Matiere/:matiereId',{matiereId:'@id'},{
        query:{ method: 'GET', url : "/api/Matiere/:matiereId?"},
        save : { method: 'POST', url: "/api/Matiere", 'Content-Type' : 'application/x-www-form-urlencoded'},
        delete : { method : 'DELETE' , url : "/api/Matiere/:matiereId"}
      });
}

MatieresController.$inject = ["$scope", "$http", "$sce", "MatieresService", "MatiereService", "FournisseursService"];

function MatieresController ($scope, $http, $sce, MatieresService, MatiereService, FournisseursService) {

  vm = this;
  vm.ajoutMatiere = {};
  vm.ajoutMatiere.fournisseurs = [];
  vm.Fournisseurs = FournisseursService.query();

  vm.aMatiere = function (obj){
    var data = angular.toJson(obj);
    console.debug("Ajouter");
    vm.Matiere = MatiereService.save(data, function() {
      vm.Matieres = MatieresService.query();
      vm.ajoutF = {};
      }
    );
  };
  vm.amMatiere = function (){
    console.debug("Annuler");
    vm.modifiermatiere = {};
  };
  vm.smMatiere = function (obj){
    if(obj.id){
      vm.modifiermatiere.id = obj.id;
    }
    if(obj.name){
      vm.modifiermatiere.name = obj.name;
    }
    if(obj.qtt){
      vm.modifiermatiere.qtt = obj.qtt;
    }
    if(obj.fournisseurs){
      vm.modifiermatiere.fournisseurs = obj.fournisseurs;
    }
    if(obj._id){
      vm.modifiermatiere._id = obj._id;
    }
    console.debug("modifier");
  };

  vm.mMatiere = function (obj) {
    var url = "http://127.0.0.1:8080/api/Matiere";
    var data = obj;
    data = JSON.stringify(data);
    var options = {'Content-Type': 'application/x-www-form-urlencoded'};
    $http.post(url, data, options).success(function (respo) {
      vm.Matieres = MatieresService.query();
      vm.ajoutMatiere = {};
      vm.modifiermatiere =  {};
    });
    console.debug("Sauvegarder");
  };

  vm.sMatiere = function (prod){
    vm.Matiere = MatiereService.delete({matiereId: prod._id}, function(){
        vm.Matieres = MatieresService.query();
    });
  };
  vm.acFournisseur = function(){
        var obj = { id : null };
        vm.ajoutMatiere.fournisseurs.push(obj);
        console.debug("Ajout Champ Fournisseur");
  };

  vm.rcFrounisseur = function(){
      vm.ajoutMatiere.fournisseurs = [];
  };
  // $http.get("http://127.0.0.1:8080/api/Matieres").success(function (response) {
  //   $scope.Matieres = response;
  // });
  vm.Matieres = MatieresService.query();

}

MatieresService.$inject = ["$resource","$localStorage"];

function MatieresService ($resource,$localStorage) {
  return $resource('', {}, {
    query : { method:'GET', url: "/api/Matieres", isArray : true}
  });
}

  
ProduitController.$inject = ["$scope", "$http", "$routeParams", "ProduitService", "ProduitsService", "MatieresService"];

function ProduitController ($scope, $http, $routeParams, ProduitService, ProduitsService, MatieresService) {
  vm = this;

  vm.Produit2 = [];
  vm.modifierproduit = {};
  vm.modifierproduit.nomenclature = {};
  vm.modifierproduit.stock = [];
  vm.modifierproduit.nomenclature.produits = [];
  vm.modifierproduit.nomenclature.matieres = [];
  vm.Produit = {};
  vm.Produit.nomenclature={};
  vm.Produit.nomenclature.produits = [];
  vm.Produit.nomenclature.matieres = [];
  vm.Produit = ProduitService.query({produitId: $routeParams.produitId});
  vm.Produits = ProduitsService.query();
  vm.Matieres = MatieresService.query();

  vm.amProduit = function () {
    console.debug("Annuler");
    vm.modifierproduit = {};
  };

  vm.mProduit = function (obj) {
    var data = JSON.stringify(obj);
    vm.Produit = ProduitService.save(data, function() {
      vm.Produit = ProduitService.query({produitId: $routeParams.produitId});
      vm.modifierproduit =  {};
      }
    );
  };

  vm.smProduit = function (obj) {
    vm.modifierproduit._id = obj._id;
    vm.modifierproduit.id = obj.id;
    vm.modifierproduit.name = obj.name;
    vm.modifierproduit.qtt = obj.qtt;
    vm.modifierproduit.nomenclature.produits = obj.nomenclature.produits;
    vm.modifierproduit.nomenclature.matieres = obj.nomenclature.matieres;
    vm.modifierproduit.stock = obj.stock;
    console.debug("modifier");
  };

  vm.acProduit = function(){
        var produitC = { id : null, qtt : null };
        vm.modifierproduit.nomenclature.produits.push(produitC);
        console.debug("Ajout Champ Produit");
  };

  vm.rcProduit = function(){
      vm.modifierproduit.nomenclature.produits = [];
  };

  vm.acStock = function(){
        var stockC = { location : null, qtt : null };
        vm.modifierproduit.stock.push(stockC);
        console.debug("Ajout Champ Produit");
  };

  vm.rcStock = function(){
      vm.modifierproduit.nomenclature.stock = [];
  };

  vm.acMatiere = function(){
        var matiereC = { id : null, qtt : null };
        vm.modifierproduit.nomenclature.matieres.push(matiereC);
        console.debug("Ajout Champ Matiere");
  };

  vm.rcMatiere = function(){
      vm.modifierproduit.nomenclature.matieres = [];
  };

  function checkP ( ) {
    vm.Produit.$promise.then(function (result) {
      angular.forEach(result.nomenclature.produits, function(value1, key1){
        vm.Produits.$promise.then(function (result2) {
          console.log(result2);
          angular.forEach(result2, function(value2, key2) {
            if(value2.id === value1.id)
            {
              value1.name = value2.name;
              vm.Produit2.push(value1);
              return this;
            }
          });
        });
      });
      angular.forEach(vm.Produit.nomenclature.matieres, function(value11, key1){
        vm.Matieres.$promise.then(function (result22) {
          angular.forEach(result22, function(value22, key2) {
            if(value22.id === value11.id)
              {
                value11.name = value22.name;
                return this;
              }
          });
        });
      });
    });
  }
  checkP();
}





ProduitService.$inject = ["$resource","$localStorage"];

function ProduitService ($resource,$localStorage) {
  return $resource('',{ produitId:'@id' },{
      query : { method: 'GET', url : "/api/Produit/:produitId"},
      save : { method: 'POST', url: "/api/Produit", 'Content-Type' : 'application/x-www-form-urlencoded'},
      delete : { method : 'DELETE' , url : "/api/Produit/:produitId"}
  });
}

ProduitsController.$inject = ["$scope", "$http", "$sce", "ProduitsService", "ProduitService", "MatieresService"];

function ProduitsController($scope, $http, $sce, ProduitsService, ProduitService, MatieresService) {
  vm = this;
  vm.modifierproduit = {};
  vm.ajoutproduit = {};
  vm.ajoutproduit.nomenclature = {};
  vm.ajoutproduit.nomenclature.produits = [];
  vm.ajoutproduit.nomenclature.matieres = [];


  vm.Produits = ProduitsService.query();
  vm.Matieres = MatieresService.query();

  vm.acProduit = function () {
    var produitC = { id: null, qtt: null };
    vm.ajoutproduit.nomenclature.produits.push(produitC);
    console.debug("Ajout Champ Produit");
  };

  vm.rcProduit = function () {
    vm.ajoutproduit.nomenclature.produits = [];
  };

  vm.acMatiere = function () {
    var matiereC = { id: null, qtt: null };
    vm.ajoutproduit.nomenclature.matieres.push(matiereC);
    console.debug("Ajout Champ Matiere");
  };

  vm.rcMatiere = function () {
    vm.ajoutproduit.nomenclature.matieres = [];
  };

  vm.aProduit = function (obj) {
    var data = angular.toJson(vm.ajoutproduit);

    vm.Produit = ProduitService.save(data, function () {
      vm.Produits = ProduitsService.query();
      vm.ajoutproduit = {};
    }
    );
  };

  vm.amProduit = function () {
    console.debug("Annuler");
    vm.modifierproduit = {};
  };

  vm.smProduit = function (obj) {
    if (obj.id) {
      vm.modifierproduit.id = obj.id;
    }
    if (obj.name) {
      vm.modifierproduit.name = obj.name;
    }
    if (obj.qtt) {
      vm.modifierproduit.qtt = obj.qtt;
    }
    if (obj._id) {
      vm.modifierproduit._id = obj._id;
    }
    if (obj.nomenclature.produits) {
      vm.modifierproduit.nomenclature.produits = obj.nomenclature.produits;
    }
    if (obj.nomenclature.matieres) {
      vm.modifierproduit.nomenclature.matieres = obj.nomenclature.matieres;
    }
    if (obj.stock) {
      vm.modifierproduit.stock = obj.stock;
    }
    console.debug("modifier");
  };

  vm.mProduit = function (obj) {
    var data = JSON.stringify(obj);
    vm.Produit = ProduitService.save(data, function () {
      vm.Produits = ProduitsService.query();
      vm.ajoutproduit = {};
      vm.modifierproduit = {};
    }
    );
  };

  vm.sProduit = function (prod) {
    vm.Produit = ProduitService.delete({ produitId: prod._id }, function () {
      vm.Produits = ProduitsService.query();
    });
  };
}
angular.module("GpApp.mPurchases", [])
  .factory("AchatService", AchatService)
  .factory("AchatsService", AchatsService)
  .factory("FournisseurService", FournisseurService)
  .factory("FournisseursService", FournisseursService)
  .controller("AchatController", AchatController)
  .controller("AchatsController", AchatsController)
  .controller("FournisseurController", FournisseurController)
  .controller("FournisseursController", FournisseursController)
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/Achats', {
          templateUrl: './App/modules/purchases/purchases/view.html',
          controller: 'AchatsController',
          controllerAs: 'vm'
        }).
        when('/Achat/:achatId', {
          templateUrl: './App/modules/purchases/purchase/view.html',
          controller: 'AchatController',
          controllerAs: 'vm'
        }).
        when('/Fournisseurs', {
          templateUrl: './App/modules/purchases/providers/view.html',
          controller: 'FournisseursController',
          controllerAs: 'vm'
        }).
        when('/Fournisseur/:fournisseurId', {
          templateUrl: './App/modules/purchases/provider/view.html',
          controller: 'FournisseurController',
          controllerAs: 'vm'
        });
    }
  ]);



AchatsService.$inject = ["$resource","$localStorage"];

function AchatsService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method : 'GET', url: "/api/Achats", isArray:true}
  });
  


}

FournisseurController.$inject = ["$scope", "$http", "$routeParams", "$sce", "FournisseurService"];

function FournisseurController ($scope, $http, $routeParams, $sce, FournisseurService) {
  $scope.Fournisseur = FournisseurService.query({fournisseurId: $routeParams.fournisseurId});
}


FournisseurService.$inject = ["$resource","$localStorage"];

function FournisseurService ($resource,$localStorage) {
  return $resource('',{fournisseurId:'@id'},{
      query: { method : 'GET', url : "/api/Fournisseur/:fournisseurId", isArray: true},
      save : { method: 'POST', url: "/api/Fournisseur", 'Content-Type' : 'application/x-www-form-urlencoded'},
      delete : { method : 'DELETE' , url : "/api/Fournisseur/:fournisseurId"}
  });
}

FournisseursController.$inject = ["$scope", "$http", "$sce","FournisseursService","FournisseurService"];

function FournisseursController($scope, $http, $sce, FournisseursService, FournisseurService) {
  $scope.Fournisseurs = FournisseursService.query();

      $scope.aFournisseur = function (obj){
        var data = angular.toJson(obj);

        $scope.Fournisseur = Fournisseur.save(data, function() {
          $scope.Fournisseurs = FournisseursService.query();
          $scope.ajoutF = {};
          }
        );
      };
      $scope.aChampContact = function(){
			     var Contact = { adresse : null, name : null, phone : null, mail : null };
		       $scope.ajoutF.contact.push(Contact);
		  };

      $scope.sFournisseur = function (prod){
        $scope.Fournisseur = FournisseurService.delete({fournisseurId: prod._id}, function(){
           $scope.Fournisseurs = FournisseursService.query();
        });
      };
}
FournisseursService.$inject = ["$resource","$localStorage"];

function FournisseursService ($resource,$localStorage) {
    return $resource('', {}, {
        query: { method : 'GET', url: "/api/Fournisseurs", isArray : true}
    });
}

    
AchatController.$inject = ["$scope", "$http", "$sce", "$routeParams", "AchatServices"];

function AchatController ($scope, $http, $sce, $routeParams, AchatServices) {
    ACtrl = this;

    $scope.Achat = AchatServices.query({ achatId : $routeParams.achatId});
    console.log($scope.Achat);

    $scope.supprimerAchat = function (obj) {
        $scope.Achat =  Achat.delete({ achatId : obj._id});
        
    };
}


AchatService.$inject = ["$resource","$localStorage"];

function AchatService ($resource,$localStorage){
  return $resource('',{achatId:'@id'},{
    query: { method : 'GET', url : "/api/Achat/:achatId"},
    save : { method: 'POST', url: "/api/Achat", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Achat/:achatId"}
  });
}


AchatsController.$inject = ["$scope", "$http", "$sce", "AchatsService", "AchatService", "FournisseursService", "ProduitsService", "MatieresService", "EtatsService"];

function AchatsController($scope, $http, $sce, AchatsService, AchatService, FournisseursService, ProduitsService, MatieresService, EtatsService) {
  var vm = this;
  
  vm.Achats = AchatsService.query();
  vm.Fournisseurs = FournisseursService.query();
  vm.Produits = ProduitsService.query();
  vm.Matieres = MatieresService.query();
  vm.Etats = EtatsService.get();

  vm.aAchat = function (obj) {
    var data = angular.toJson(obj);
    vm.Achat = AchatService.save(data, function () {
      vm.Achats = AchatsService.query();
      vm.ajoutA = {};
    });
  };
}
FactureController.$inject= ["$routeParams", "FacturationService"];

function FactureController ($routeParams, FacturationService) {
    var vm = this;
    FacturationService.getFacture($routeParams.id).then(function(facture){
      vm.facture = facture;
    });

    vm.generatePDF = function (){
        var pdf = new jsPDF('p','pt','a4');
        var options = { pagesplit: true };
         pdf.addHTML($('#facturePDF'),15,15,{
					'background': '#fff',
					'width': 1800, 
                    'height': 1800, 
   			 },function() {
             /*pdf.save(vm.facture.numero + '.pdf');*/
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
        doc.fromHTML($('#facturePDF').html(),15,15, {
            /*'width': 170,*/ 
            'elementHandlers': specialElementHandlers
        },function(){
            doc.autoPrint();
            window.open(doc.output('datauristring'));
        });

    };
  }
FacturemodalController.$inject = ["$location","$uibModal","$uibModalInstance","autocservice","clientservice","produitservice","FacturationService"];

function FacturemodalController ($location,$uibModal,$uibModalInstance,autocservice,clientservice,produitservice,FacturationService) {
    vm = this;
    vm.Produits = [];
    vm.simulateQuery = false;
    vm.isDisabled    = false;
    vm.thtp = "20%";
    vm.F = {};
    vm.F.client = {};
    vm.F.prix = {};
    vm.F.produits = [];
    vm.F.prix.ht = 0;
    vm.C = {};
    vm.C.client = {};
    vm.C.queryResults = [];
    vm.C.queryResults = listClient() || [];
    vm.querySearch   = querySearch;
    vm.querySearchproduits = querySearchproduits;
    vm.querySearchproduitsD = querySearchproduitsD;
    vm.P = {};
    vm.P.queryResults = [];
    vm.P.queryResults = listProduit() || [];
    vm.selectedCItemChange = selectedCItemChange();
    vm.selectedItemChange = autocservice.selectedItemChange();
    vm.searchTextChange   = autocservice.searchTextChange();
    vm.newState = autocservice.newState();
    
    vm.F.Produits = [];
    vm.paiement = [
        {
            value : "cb", 
            display : "CB"
        },
        {
            value : "cheque",
            display : "Chèque"
        },
        {
            value : "especes",
            display : "Espèces"
        }
        
    ];

    vm.ajouterChamp = function () {
        vm.Produits.push({});
    };
    vm.delChamp = function (obj){
        vm.Produits.splice(obj,1);
        tFacture();
    };
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    vm.totalFacture = function (obj) {
        if (obj.selectedItem){
            if (obj.selectedItem.prix && obj.quantite){
                obj.tttc = obj.selectedItem.prix.vente * obj.quantite;
                obj.ht = obj.selectedItem.prix.vente / 1.2;
                obj.ht = obj.ht.toFixed(2);
                tFacture();
                return obj;
            }
        }
    };
    function totalProduit(obj){
        var result = 
        console.log(result);
        return result;
    }
    vm.ok = function (data) {
        vm.FL = {};
        vm.FL.produits = [];
        vm.FL.paiement = {};
        vm.FL.prix = {};
        vm.FL.client = {};
        vm.FL.date = data.date;
        vm.FL.vendeur = "Admin";
        vm.FL.paiement.moyen = data.paiement.moyen;
        vm.FL.prix.ht = vm.F.prix.ht;
        vm.FL.prix.ttc = vm.F.prix.ttc;
        vm.FL.client = vm.C.selectedItem;
        vm.FL.client.id = vm.C.selectedItem.ref;
        vm.FL.client.nom  = vm.C.selectedItem.display;
       

        for(index = 0; index < vm.Produits.length; ++index)
        {
            
            vm.FL.produits.push({ref : vm.Produits[index].selectedItem.ref,garantie: {duree : vm.Produits[index].selectedItem.garantie.duree}, denomination : vm.Produits[index].selectedItem.denomination, quantite : vm.Produits[index].quantite, prix : { ttc : vm.Produits[index].selectedItem.prix.vente , ht : vm.Produits[index].selectedItem.prix.vente  / 1.2, tttc : vm.Produits[index].quantite * vm.Produits[index].selectedItem.prix.vente}});
        }
        
        FacturationService.setFacture(vm.FL).then(function(facture){
            $uibModalInstance.close();
            $location.path('/Facture/'+ facture._id);
            
        });
    };

    vm.newClient = function (){
        var modalInstance = $uibModal.open({
          animation: vm.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: '/cl/_modules/client/index.modal.view.client.html',
          controller: 'ClientmodalController',
          controllerAs: 'cCtrl'
        });

        modalInstance.result.then(function (obj) {
            vm.C.queryResults = listClient() || [];
        });
    };
    function selectedCItemChange(item){
        console.log(item);
       
    }
    function listClient() {
        var list = [];
        var obj = clientservice.getClients();
        
        obj.then(function(vari){
            for (index = 0; index < vari.length; ++index){
                list.push({
                    value: vari[index].nom.toLowerCase(),
                    display: vari[index].nom,
                    ref: vari[index].id,
                    tel:vari[index].tel,
                    mail:vari[index].mail,
                    adresse:vari[index].adresse,
                    cp:vari[index].cp,
                    pays:vari[index].pays,
                });
            }       
        });
        return list;
    }
    function listProduit() {
        var list = [];
        var obj = produitservice.getProduits();
        
        obj.then(function(vari){
            for (index = 0; index < vari.length; ++index){
                if(vari[index].prix && vari[index].garantie && vari[index].processeur && vari[index].ram && vari[index].stockage){
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination + " " + vari[index].processeur.valeur + "-" + vari[index].ram.taille + "Go-" +vari[index].stockage.taille +"Go",
                        prix : { vente: vari[index].prix.vente},
                        garantie : { duree : vari[index].garantie.duree}
                    });
                }
                else if (vari[index].prix && vari[index].garantie){
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination,
                        prix : { vente: vari[index].prix.vente},
                        garantie : { duree : vari[index].garantie.duree}
                    });
                }
                else if (vari[index].prix){
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination,
                        prix : { vente: vari[index].prix.vente}
                    });
                }
                else {
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination
                    });
                }

            }       
        });
        return list;
    }
    
    function querySearch (query, list) {
        var results = query ? vm.C.queryResults.filter( autocservice.createFilterFor(query) ) : vm.C.queryResults,
            deferred;
      
        return results;
      
    }
    function querySearchproduits (query, list) {
        var results = query ? vm.P.queryResults.filter( autocservice.createFilterFor(query) ) : vm.P.queryResults,
            deferred;
      
        return results;
      
    }
    function querySearchproduitsD (query, list) {
        var results = query ? vm.P.queryResults.filter( autocservice.createFilterForDisplay(query) ) : vm.P.queryResults,
            deferred;
      
        return results;
      
    }
    function tFacture() {
        vm.F.prix.ttc = 0;
        vm.F.prix.ht = 0;
        for(index = 0; index < vm.Produits.length; ++index)
        {
            vm.F.prix.ttc  = vm.F.prix.ttc  + vm.Produits[index].tttc;
            vm.F.prix.ht  = vm.F.prix.ttc  / 1.2;
            
        }
    }
    
}
FacturationController.$inject = ["$location","$uibModal","FacturationService"];

function FacturationController ($location,$uibModal,FacturationService){
    vm = this;
    vm.status = "facture";
    FacturationService.getFactureList().then(function(data){
        vm.List = data;
    });
    vm.animationsEnabled = false;
    vm.checkstatus = function (obj){
        if(obj === "facture"){
            FacturationService.getFactureList().then(function(data){
                vm.List = data;
            });
        }else{
            FacturationService.getDevisList().then(function(data){
                vm.List = data;
            });
        }
    };
    vm.openFactureModal = function (){
        
      var modalInstance = $uibModal.open({
          animation: vm.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: '/cl/_modules/facturation/facture/modal/view.html',
          controller: 'FacturemodalController',
          controllerAs: 'vm'
        });

        modalInstance.result.then(function (obj) {
            
        });
    };
    vm.openDevisModal = function (){
        
      var modalInstance = $uibModal.open({
          animation: vm.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: '/cl/_modules/facturation/devis/modal/view.html',
          controller: 'DevismodalController',
          controllerAs: 'vm'
        });

        modalInstance.result.then(function (obj) {
            
        });
    };
    vm.devislist = function(){
        FacturationService.getDevisList().then(function(data){
            console.log(data);
            vm.List = data;
        });
    };
   
    vm.rechercheList = function(obj){
        
        FacturationService.getJourFactureList(obj).then(function(data){
            vm.List = data;
        });
    };
    vm.rechercheList2 = function(obj){
        
        FacturationService.getJourFactureList2(obj).then(function(data){
            vm.List = data;
        });
    };

    vm.factureAujourdhui = function () {
        FacturationService.getFactureList().then(function(data){
            vm.List = data;
        });
    };
    vm.factureMois = function () {
        FacturationService.getMoisFactureList().then(function(data){
            vm.List = data;
        });
    };
    vm.factureAnnee = function () {
        FacturationService.getAnneeFactureList().then(function(data){
            vm.List = data;
        });
    };
    vm.afficherFacture = function (obj) {
        $location.path("/Facture/"+obj._id);
    };
    vm.devisAujourdhui = function () {
        FacturationService.getDevisList().then(function(data){
            vm.List = data;
        });
    };
    vm.devisMois = function () {
        FacturationService.getMoisDevisList().then(function(data){
            vm.List = data;
        });
    };
    vm.devisAnnee = function () {
        FacturationService.getAnneeDevisList().then(function(data){
            vm.List = data;
        });
    };
    vm.afficherDevis = function (obj) {
        $location.path("/Devis/"+obj._id);
    };

}
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
VentesService.$inject = ["$resource","$localStorage"];

function VentesService ($resource,$localStorage) {
  return $resource('', {}, {
      query: { method:'GET', url: "/api/Ventes", isArray : true}
    });
}
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
DevismodalController.$inject = ["$location","$uibModal","$uibModalInstance","autocservice","clientservice","produitservice","FacturationService"];

function DevismodalController ($location,$uibModal,$uibModalInstance,autocservice,clientservice,produitservice,FacturationService) {
    vm = this;
    vm.Produits = [];
    vm.simulateQuery = false;
    vm.isDisabled    = false;
    vm.thtp = "20%";
    vm.F = {};
    vm.F.client = {};
    vm.F.prix = {};
    vm.F.produits = [];
    vm.F.prix.ht = 0;
    vm.C = {};
    vm.C.client = {};
    vm.C.queryResults = [];
    vm.C.queryResults = listClient() || [];
    vm.querySearch   = querySearch;
    vm.querySearchproduits = querySearchproduits;
    vm.querySearchproduitsD = querySearchproduitsD;
    vm.P = {};
    vm.P.queryResults = [];
    vm.P.queryResults = listProduit() || [];
    vm.selectedCItemChange = selectedCItemChange();
    vm.selectedItemChange = autocservice.selectedItemChange();
    vm.searchTextChange   = autocservice.searchTextChange();
    vm.newState = autocservice.newState();
    
    vm.F.Produits = [];
    

    vm.ajouterChamp = function () {
        vm.Produits.push({});
    };
    vm.delChamp = function (obj){
        vm.Produits.splice(obj,1);
        tFacture();
    };
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    vm.totalFacture = function (obj) {
        if (obj.selectedItem){
            if (obj.selectedItem.prix && obj.quantite){
                obj.tttc = obj.selectedItem.prix.vente * obj.quantite;
                obj.ht = obj.selectedItem.prix.vente / 1.2;
                obj.ht = obj.ht.toFixed(2);
                tFacture();
                return obj;
            }
        }
    };
    function totalProduit(obj){
        var result = 
        console.log(result);
        return result;
    }
    vm.ok = function (data) {
        vm.FL = {};
        vm.FL.produits = [];
        vm.FL.prix = {};
        vm.FL.client = {};
        vm.FL.date = data.date;
        vm.FL.vendeur = "Admin";
        vm.FL.prix.ht = vm.F.prix.ht;
        vm.FL.prix.ttc = vm.F.prix.ttc;
        vm.FL.client = vm.C.selectedItem;
        vm.FL.client.id = vm.C.selectedItem.ref;
        vm.FL.client.nom  = vm.C.selectedItem.display;
       

        for(index = 0; index < vm.Produits.length; ++index)
        {
            
            vm.FL.produits.push({ref : vm.Produits[index].selectedItem.ref,garantie: {duree : vm.Produits[index].selectedItem.garantie.duree}, denomination : vm.Produits[index].selectedItem.denomination, quantite : vm.Produits[index].quantite, prix : { ttc : vm.Produits[index].selectedItem.prix.vente , ht : vm.Produits[index].selectedItem.prix.vente  / 1.2, tttc : vm.Produits[index].quantite * vm.Produits[index].selectedItem.prix.vente}});
        }
       
        FacturationService.setDevis(vm.FL).then(function(devis){
            $uibModalInstance.close();
            
            $location.path('/Devis/'+ devis._id);
            
        });
    };

    vm.newClient = function (){
        var modalInstance = $uibModal.open({
          animation: vm.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: '/cl/_modules/client/index.modal.view.client.html',
          controller: 'ClientmodalController',
          controllerAs: 'cCtrl'
        });

        modalInstance.result.then(function (obj) {
            vm.C.queryResults = listClient() || [];
        });
    };
    function selectedCItemChange(item){
        console.log(item);
       
    }
    function listClient() {
        var list = [];
        var obj = clientservice.getClients();
        
        obj.then(function(vari){
            for (index = 0; index < vari.length; ++index){
                list.push({
                    value: vari[index].nom.toLowerCase(),
                    display: vari[index].nom,
                    ref: vari[index].id,
                    tel:vari[index].tel,
                    mail:vari[index].mail,
                    adresse:vari[index].adresse,
                    cp:vari[index].cp,
                    pays:vari[index].pays,
                });
            }       
        });
        return list;
    }
    function listProduit() {
        var list = [];
        var obj = produitservice.getProduits();
        
        obj.then(function(vari){
            for (index = 0; index < vari.length; ++index){
                if(vari[index].prix && vari[index].garantie && vari[index].processeur && vari[index].ram && vari[index].stockage){
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination + " " + vari[index].processeur.valeur + "-" + vari[index].ram.taille + "Go-" +vari[index].stockage.taille +"Go",
                        prix : { vente: vari[index].prix.vente},
                        garantie : { duree : vari[index].garantie.duree}
                    });
                }
                else if (vari[index].prix && vari[index].garantie){
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination,
                        prix : { vente: vari[index].prix.vente},
                        garantie : { duree : vari[index].garantie.duree}
                    });
                }
                else if (vari[index].prix){
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination,
                        prix : { vente: vari[index].prix.vente}
                    });
                }
                else {
                    list.push({
                        value: vari[index].ref.toLowerCase(),
                        display: vari[index].ref,
                        ref: vari[index].ref,
                        denomination: vari[index].denomination
                    });
                }

            }       
        });
        return list;
    }
    
    function querySearch (query, list) {
        var results = query ? vm.C.queryResults.filter( autocservice.createFilterFor(query) ) : vm.C.queryResults,
            deferred;
      
        return results;
      
    }
    function querySearchproduits (query, list) {
        var results = query ? vm.P.queryResults.filter( autocservice.createFilterFor(query) ) : vm.P.queryResults,
            deferred;
      
        return results;
      
    }
    function querySearchproduitsD (query, list) {
        var results = query ? vm.P.queryResults.filter( autocservice.createFilterForDisplay(query) ) : vm.P.queryResults,
            deferred;
      
        return results;
      
    }
    function tFacture() {
        vm.F.prix.ttc = 0;
        vm.F.prix.ht = 0;
        for(index = 0; index < vm.Produits.length; ++index)
        {
            vm.F.prix.ttc  = vm.F.prix.ttc  + vm.Produits[index].tttc;
            vm.F.prix.ht  = vm.F.prix.ttc  / 1.2;
            
        }
    }
    
}
VenteController.$inject = ["$scope", "$http", "$sce", "$routeParams", "VenteService", "ProduitsService"];

function VenteController ($scope, $http, $sce, $routeParams, VenteService, ProduitsService) {
    $scope.Vente = VenteService.query({ venteId:  $routeParams.venteId });
    $scope.Produits =  ProduitsService.query();
    $scope.Total = null;

    $scope.supprimerVente =  function (obj) {
        $scope.Vente = VenteService.delete({venteId : obj._id});
    };
    console.log($scope.Vente);
    $scope.Vente.$promise.then(function (result) {
        if(result.produits){
            
            angular.forEach(result.produits, function(value, key1){
                $scope.Total = $scope.Total + value.prix;
            });
        }
    });
}


VenteService.$inject = ['$resource','$localStorage'];

function VenteService ($resource,$localStorage) {
  return $resource('',{userId:'@id'},{
        query: { method: 'GET', url : "/api/Vente/:venteId"},
        save : { method: 'POST', url: "/api/Vente", 'Content-Type' : 'application/x-www-form-urlencoded'},
        delete : { method : 'DELETE' , url : "/api/Vente/:venteId"}
      });
}

FacturationService.$inject = ["$http"];

function FacturationService ($http) {
    return {
        getFacture: getFacture,
        setFacture: setFacture,
        getFactureList : getFactureList,
        delFacture : delFacture,
        getAnneeFactureList: getAnneeFactureList,
        getMoisFactureList: getMoisFactureList,
        getJourFactureList: getJourFactureList,
        getJourFactureList2: getJourFactureList2,
        getDevis: getDevis,
        setDevis: setDevis,
        getDevisList : getDevisList,
        delDevis : delDevis,
        getAnneeDevisList: getAnneeDevisList,
        getMoisDevisList: getMoisDevisList,
        getJourDevisList: getJourDevisList,
        getJourDevisList2: getJourDevisList2
    };
    function delFacture(pId){
        return $http.delete("/api/Facture/"+pId)
            .then(delFactureComplete)
            .catch(delFactureFailed);

        function delFactureComplete(response) {
            return response.data;
        }

        function delFactureFailed(error) {
            return console.log(error);
        }
    }
    function getFacture(pId) {
        return $http.get("/api/Facture/"+pId)
            .then(getFactureComplete)
            .catch(getFactureFailed);

        function getFactureComplete(response) {
            return response.data.SUCCESS;
        }

        function getFactureFailed(error) {
            return console.log(error);
        }
    }
    function getFactureList(){
        return $http.get("/api/FactureList/Aujourdhui")
            .then(getFactureListComplete)
            .catch(getFactureListFailed);

        function getFactureListComplete(response) {
            return response.data.SUCCESS;
        }

        function getFactureListFailed(error) {
            return console.log(error);
        }
    }
    function setFacture(facture) {
        return $http.post("/api/Facture", facture)
        .then(setFactureComplete)
        .catch(setFactureFailed);

        function setFactureComplete(response) {
            return response.data.SUCCESS;
        }

        function setFactureFailed(error) {
            return console.log(error);
        }
    }
    function getAnneeFactureList(){
        return $http.get("/api/FactureList/Annee")
            .then(getAnneeFactureListComplete)
            .catch(getAnneeFactureListFailed);

        function getAnneeFactureListComplete(response) {
            return response.data.SUCCESS;
        }

        function getAnneeFactureListFailed(error) {
            return console.log(error);
        }
    }
    function getMoisFactureList(){
        return $http.get("/api/FactureList/Mois")
            .then(getMoisFactureListComplete)
            .catch(getMoisFactureListFailed);

        function getMoisFactureListComplete(response) {
            return response.data.SUCCESS;
        }

        function getMoisFactureListFailed(error) {
            return console.log(error);
        }
    }
    function getJourFactureList(obj){
        return $http.post("/api/FactureList/Jour", obj)
            .then(getJourFactureListComplete)
            .catch(getJourFactureListFailed);

        function getJourFactureListComplete(response) {
            return response.data.SUCCESS;
        }

        function getJourFactureListFailed(error) {
            return console.log(error);
        }
    }
    function getJourFactureList2(obj){
        return $http.post("/api/FactureList/Jour2", obj)
            .then(getJourFactureListComplete)
            .catch(getJourFactureListFailed);

        function getJourFactureListComplete(response) {
            return response.data.SUCCESS;
        }

        function getJourFactureListFailed(error) {
            return console.log(error);
        }
    }
       
    function delDevis(pId){
        return $http.delete("/api/Devis/"+pId)
            .then(delDevisComplete)
            .catch(delDevisFailed);

        function delDevisComplete(response) {
            return response.data;
        }

        function delDevisFailed(error) {
            return console.log(error);
        }
    }
    function getDevis(pId) {
        return $http.get("/api/Devis/"+pId)
            .then(getDevisComplete)
            .catch(getDevisFailed);

        function getDevisComplete(response) {
            return response.data.SUCCESS;
        }

        function getDevisFailed(error) {
            return console.log(error);
        }
    }
    function getDevisList(){
        return $http.get("/api/DevisList")
            .then(getDevisListComplete)
            .catch(getDevisListFailed);

        function getDevisListComplete(response) {
            console.log("GetDevislist:",response);
            return response.data;
        }

        function getDevisListFailed(error) {
            return console.log(error);
        }
    }
    function setDevis(devis) {
        return $http.post("/api/Devis", devis)
        .then(setDevisComplete)
        .catch(setDevisFailed);

        function setDevisComplete(response) {
            return response.data.SUCCESS;
        }

        function setDevisFailed(error) {
            return console.log(error);
        }
    }
    function getAnneeDevisList(){
        return $http.get("/api/DevisList/Annee")
            .then(getAnneeDevisListComplete)
            .catch(getAnneeDevisListFailed);

        function getAnneeDevisListComplete(response) {
            return response.data.SUCCESS;
        }

        function getAnneeDevisListFailed(error) {
            return console.log(error);
        }
    }
    function getMoisDevisList(){
        return $http.get("/api/DevisList/Mois")
            .then(getMoisDevisListComplete)
            .catch(getMoisDevisListFailed);

        function getMoisDevisListComplete(response) {
            return response.data.SUCCESS;
        }

        function getMoisDevisListFailed(error) {
            return console.log(error);
        }
    }
    function getJourDevisList(obj){
        return $http.post("/api/DevisList/Jour", obj)
            .then(getJourDevisListComplete)
            .catch(getJourDevisListFailed);

        function getJourDevisListComplete(response) {
            return response.data.SUCCESS;
        }

        function getJourDevisListFailed(error) {
            return console.log(error);
        }
    }
    function getJourDevisList2(obj){
        return $http.post("/api/DevisList/Jour2", obj)
            .then(getJourDevisListComplete)
            .catch(getJourDevisListFailed);

        function getJourDevisListComplete(response) {
            return response.data.SUCCESS;
        }

        function getJourDevisListFailed(error) {
            return console.log(error);
        }
    }

}
SessionController.$inject = ["SessionService"];

function SessionController (SessionService) {
    return {
        create : create,
        destroy : destroy
    };
    function create (token,name) {
        SessionService.setToken(token);
        SessionService.setName(name);
        SessionService.setIslogedIn(true);
    }
    function destroy(){
        SessionService.setIslogedIn(false);
    }
}
SessionService.$inject = [];

function SessionService () {
    var name,token,islogedin;
    return {
        setName : setName,
        getName : getName,
        setToken : setToken,
        getToken : getToken,
        setIsLogedIn : setIsLogedIn,
        getIsLogedIn : getIsLogedIn
    };

    function setName (obj) {
        name = obj;
    }
    function getName () {
        return name;
    }
    function setToken (obj) {
        token = obj;
    }
    function getToken () {
        return token;
    }
    function setIsLogedIn (obj) {
        islogedin = obj;
    }
    function getIsLogedIn () {
        return islogedin;
    }
}
angular.module("GpApp.mTaches", [])
.controller("TachesController",TachesController)
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
       when('/Taches', {
        templateUrl: './App/modules/tache/index/view.html',
        controller: 'TachesController'
      });
    }
]);

TachesController.$inject = ["$scope", "$http", "$sce", "ProduitsService", "ProduitService", "MatieresService", "MatiereService"];

function TachesController ($scope, $http, $sce, ProduitsService, ProduitService, MatieresService, MatiereService) {
  $scope.Produits = ProduitsService.query();
  $scope.Matieres = MatieresService.query();

  $scope.fProduit = function (obj) {
    if(obj.produit.nomenclature.produits.length > 0)
    {
      //On parcourt la liste des produits dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.produits, function(value, key){

        //On parcourt la liste des produits
        angular.forEach($scope.Produits, function (value2, keys2) {

          //On compare l'id des produits dans la nomenclature avec les id de la liste des produits
          if(value.id === value2.id)
          {
            //Verification si stock suffisant pour la fabrication du produit
            if(obj.qtt * value.qtt > value2.qtt)
            {
              return console.debug("Pas de stock");
            }
          }
        });
      });
    }
    if (obj.produit.nomenclature.matieres.length > 0) {
      //On parcourt la liste des matieres dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.matieres, function(value, key){
        angular.forEach($scope.Matieres, function(value2, key2){
          if (value.id === value2.id) {
            if (obj.qtt * value.qtt > value2.qtt) {
              return console.debug("Pas de stock");
            }
          }
        });
      });
    }
    if(obj.produit.nomenclature.produits.length > 0)
    {

      //On parcourt la liste des produits dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.produits, function(value, key){

        //On parcourt la liste des produits
        angular.forEach($scope.Produits, function (value2, keys2) {

          //On compare l'id des produits dans la nomenclature avec les id de la liste des produits
          if(value.id === value2.id)
          {

            //Si le stock du produit existe on execute
            //Verification si stock suffisant pour la fabrication du produit
            if(obj.qtt * value.qtt < value2.qtt)
            {
              //On retire du stock les produits utilisés pour la fabrication
              value2.qtt = value2.qtt - obj.qtt * value.qtt;
              //On ajoute dans le stock le produit fabriqué
              if (obj.produit.qtt) {
                obj.produit.qtt = obj.produit.qtt + obj.qtt;
              }
              else {
                obj.produit.qtt = obj.qtt;
              }

              //Sauvegarde dans la base du stock
              $scope.Produit = ProduitService.save(obj.produit, function() {});
              $scope.Produit = ProduitService.save(value2, function() {});

            }

          }
        });
      });
    }
    if (obj.produit.nomenclature.matieres.length > 0) {
      //On parcourt la liste des matieres dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.matieres, function(value, key){
        angular.forEach($scope.Matieres, function(value2, key2){
          if (value.id === value2.id) {
            if (obj.qtt * value.qtt < value2.qtt) {
              //On retire du stock les matieres utiliser pour la fabrication
              value2.qtt = value2.qtt - obj.qtt * value.qtt;
              //On ajoute dans le stock le produit fabriquer
              if (obj.produit.qtt) {
                obj.produit.qtt = obj.produit.qtt + obj.qtt;
              }
              else {
                obj.produit.qtt = obj.qtt;
              }
              $scope.Produit = ProduitService.save(obj.produit, function() {});
              $scope.Matiere = MatiereService.save(value2, function() {});
            }
          }
        });
      });
    }

  };
}

TachesService.$inject = ["$resource"];

function TachesService ($resource) {
  return $resource('', {}, {

    });
}
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
UsersService.$inject = ["$resource","$localStorage"];

function UsersService ($resource,$localStorage) {
  return $resource('', {}, {
      query: { method:'GET', url: "/api/Users", isArray : true}
    });
}
UserController.$inject = ["$scope", "$http", "$sce", "$routeParams", "UserService"];

function UserController ($scope, $http, $sce, $routeParams, UserService) {
  $scope.User = UserService.query({ userId : $routeParams.userId });
}


UserService.$inject = ["$resource", "$localStorage"];

function UserService ($resource,$localStorage) {
  return $resource('',{userId:'@id'},{
    query: { method: 'GET', url : "/api/User/:userId"},
    save : { method: 'POST', url: "/api/User", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/User/:userId"}
  });
}
