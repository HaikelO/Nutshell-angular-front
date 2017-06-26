UserService.$inject = ["$resource", "$localStorage"];

function UserService ($resource,$localStorage) {
  return $resource('',{userId:'@id'},{
    query: { method: 'GET', url : "/api/User/:userId"},
    save : { method: 'POST', url: "/api/User", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/User/:userId"}
  });
}
