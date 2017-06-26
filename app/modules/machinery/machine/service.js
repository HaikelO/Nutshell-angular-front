MachineService.$inject = ["$resource","$localStorage"];

function MachineService ($resource,$localStorage) {
  return $resource('/Machine/:machineId',{MachineryId:'@id'},{
    query : { method : 'GET', url : "/api/Machine/:machineId"},
    save : { method: 'POST', url: "/api/Machine", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Machine/:machineId"}
  });
}

