FournisseursService.$inject = ["$resource","$localStorage"];

function FournisseursService ($resource,$localStorage) {
    return $resource('', {}, {
        query: { method : 'GET', url: "/api/Fournisseurs", isArray : true}
    });
}