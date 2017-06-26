VentesService.$inject = ["$resource","$localStorage"];

function VentesService ($resource,$localStorage) {
  return $resource('', {}, {
      query: { method:'GET', url: "/api/Ventes", isArray : true}
    });
}