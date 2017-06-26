
AchatService.$inject = ["$resource","$localStorage"];

function AchatService ($resource,$localStorage){
  return $resource('',{achatId:'@id'},{
    query: { method : 'GET', url : "/api/Achat/:achatId"},
    save : { method: 'POST', url: "/api/Achat", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Achat/:achatId"}
  });
}

