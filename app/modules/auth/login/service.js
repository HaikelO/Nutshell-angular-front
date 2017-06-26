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