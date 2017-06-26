FournisseurService.$inject = ["$resource","$localStorage"];

function FournisseurService ($resource,$localStorage) {
  return $resource('',{fournisseurId:'@id'},{
      query: { method : 'GET', url : "/api/Fournisseur/:fournisseurId", isArray: true},
      save : { method: 'POST', url: "/api/Fournisseur", 'Content-Type' : 'application/x-www-form-urlencoded'},
      delete : { method : 'DELETE' , url : "/api/Fournisseur/:fournisseurId"}
  });
}
