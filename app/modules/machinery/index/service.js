MachineryService.$inject = ["$resource","$localStorage"];

function MachineryService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method:'GET', url: "/api/Machinery", isArray : true}
  });
}