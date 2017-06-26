MatieresService.$inject = ["$resource","$localStorage"];

function MatieresService ($resource,$localStorage) {
  return $resource('', {}, {
    query : { method:'GET', url: "/api/Matieres", isArray : true}
  });
}