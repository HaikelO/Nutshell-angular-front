MouleService.$inject = ["$resource","$localStorage"];

function MouleService ($resource,$localStorage) {
  return $resource('',{ mouleId:'@id' },{
    query: { method: 'GET', url : "/api/Moule/:mouleId"},
    save : { method: 'POST', url: "/api/Moule", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Moule/:mouleId"}
  });
}
