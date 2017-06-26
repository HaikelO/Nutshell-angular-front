AchatsService.$inject = ["$resource","$localStorage"];

function AchatsService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method : 'GET', url: "/api/Achats", isArray:true}
  });
  


}
