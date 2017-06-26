VenteService.$inject = ['$resource','$localStorage'];

function VenteService ($resource,$localStorage) {
  return $resource('',{userId:'@id'},{
        query: { method: 'GET', url : "/api/Vente/:venteId"},
        save : { method: 'POST', url: "/api/Vente", 'Content-Type' : 'application/x-www-form-urlencoded'},
        delete : { method : 'DELETE' , url : "/api/Vente/:venteId"}
      });
}
