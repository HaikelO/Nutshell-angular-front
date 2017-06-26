MoulesService.$inject = ["$resource","$localStorage"];

function MoulesService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method : 'GET', url: "/api/Moules", isArray: true}
  });
}
