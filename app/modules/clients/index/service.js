ClientsService.$inject = ["$resource","$localStorage"];

function ClientsService ($resource,$localStorage) {
    return $resource('', {}, {
        query: { method : 'GET', url: "/api/Clients", isArray : true}
    });
}