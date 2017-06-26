
    
AchatController.$inject = ["$scope", "$http", "$sce", "$routeParams", "AchatServices"];

function AchatController ($scope, $http, $sce, $routeParams, AchatServices) {
    ACtrl = this;

    $scope.Achat = AchatServices.query({ achatId : $routeParams.achatId});
    console.log($scope.Achat);

    $scope.supprimerAchat = function (obj) {
        $scope.Achat =  Achat.delete({ achatId : obj._id});
        
    };
}
