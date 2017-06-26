UsersService.$inject = ["$resource","$localStorage"];

function UsersService ($resource,$localStorage) {
  return $resource('', {}, {
      query: { method:'GET', url: "/api/Users", isArray : true}
    });
}