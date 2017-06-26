

ProduitService.$inject = ["$resource","$localStorage"];

function ProduitService ($resource,$localStorage) {
  return $resource('',{ produitId:'@id' },{
      query : { method: 'GET', url : "/api/Produit/:produitId"},
      save : { method: 'POST', url: "/api/Produit", 'Content-Type' : 'application/x-www-form-urlencoded'},
      delete : { method : 'DELETE' , url : "/api/Produit/:produitId"}
  });
}
