MatiereService.$inject = ["$resource","$localStorage"];

function MatiereService ($resource,$localStorage) {
  return $resource('/Matiere/:matiereId',{matiereId:'@id'},{
        query:{ method: 'GET', url : "/api/Matiere/:matiereId?"},
        save : { method: 'POST', url: "/api/Matiere", 'Content-Type' : 'application/x-www-form-urlencoded'},
        delete : { method : 'DELETE' , url : "/api/Matiere/:matiereId"}
      });
}
