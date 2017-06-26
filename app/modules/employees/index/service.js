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
