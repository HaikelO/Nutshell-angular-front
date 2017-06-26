ClientService.$inject = ["$resource","$localStorage"];

function ClientService ($resource,$localStorage) {
  return $resource('',{clientId:'@id'},{
    query: { method : 'GET', url : "/api/Client/:clientId"},
    save : { method: 'POST', url: "/api/Client", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Client/:clientId"}
  });
}
