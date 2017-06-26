
ProduitsService.$inject = ["$resource", "$localStorage"];

function ProduitsService($resource, $localStorage) {
  return $resource('', {}, {
    query: { method: 'GET', url: "/api/products", isArray: true }
  });
}

