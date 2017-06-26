FacturationService.$inject = ["$http"];

function FacturationService ($http) {
    return {
        getFacture: getFacture,
        setFacture: setFacture,
        getFactureList : getFactureList,
        delFacture : delFacture,
        getAnneeFactureList: getAnneeFactureList,
        getMoisFactureList: getMoisFactureList,
        getJourFactureList: getJourFactureList,
        getJourFactureList2: getJourFactureList2,
        getDevis: getDevis,
        setDevis: setDevis,
        getDevisList : getDevisList,
        delDevis : delDevis,
        getAnneeDevisList: getAnneeDevisList,
        getMoisDevisList: getMoisDevisList,
        getJourDevisList: getJourDevisList,
        getJourDevisList2: getJourDevisList2
    };
    function delFacture(pId){
        return $http.delete("/api/Facture/"+pId)
            .then(delFactureComplete)
            .catch(delFactureFailed);

        function delFactureComplete(response) {
            return response.data;
        }

        function delFactureFailed(error) {
            return console.log(error);
        }
    }
    function getFacture(pId) {
        return $http.get("/api/Facture/"+pId)
            .then(getFactureComplete)
            .catch(getFactureFailed);

        function getFactureComplete(response) {
            return response.data.SUCCESS;
        }

        function getFactureFailed(error) {
            return console.log(error);
        }
    }
    function getFactureList(){
        return $http.get("/api/FactureList/Aujourdhui")
            .then(getFactureListComplete)
            .catch(getFactureListFailed);

        function getFactureListComplete(response) {
            return response.data.SUCCESS;
        }

        function getFactureListFailed(error) {
            return console.log(error);
        }
    }
    function setFacture(facture) {
        return $http.post("/api/Facture", facture)
        .then(setFactureComplete)
        .catch(setFactureFailed);

        function setFactureComplete(response) {
            return response.data.SUCCESS;
        }

        function setFactureFailed(error) {
            return console.log(error);
        }
    }
    function getAnneeFactureList(){
        return $http.get("/api/FactureList/Annee")
            .then(getAnneeFactureListComplete)
            .catch(getAnneeFactureListFailed);

        function getAnneeFactureListComplete(response) {
            return response.data.SUCCESS;
        }

        function getAnneeFactureListFailed(error) {
            return console.log(error);
        }
    }
    function getMoisFactureList(){
        return $http.get("/api/FactureList/Mois")
            .then(getMoisFactureListComplete)
            .catch(getMoisFactureListFailed);

        function getMoisFactureListComplete(response) {
            return response.data.SUCCESS;
        }

        function getMoisFactureListFailed(error) {
            return console.log(error);
        }
    }
    function getJourFactureList(obj){
        return $http.post("/api/FactureList/Jour", obj)
            .then(getJourFactureListComplete)
            .catch(getJourFactureListFailed);

        function getJourFactureListComplete(response) {
            return response.data.SUCCESS;
        }

        function getJourFactureListFailed(error) {
            return console.log(error);
        }
    }
    function getJourFactureList2(obj){
        return $http.post("/api/FactureList/Jour2", obj)
            .then(getJourFactureListComplete)
            .catch(getJourFactureListFailed);

        function getJourFactureListComplete(response) {
            return response.data.SUCCESS;
        }

        function getJourFactureListFailed(error) {
            return console.log(error);
        }
    }
       
    function delDevis(pId){
        return $http.delete("/api/Devis/"+pId)
            .then(delDevisComplete)
            .catch(delDevisFailed);

        function delDevisComplete(response) {
            return response.data;
        }

        function delDevisFailed(error) {
            return console.log(error);
        }
    }
    function getDevis(pId) {
        return $http.get("/api/Devis/"+pId)
            .then(getDevisComplete)
            .catch(getDevisFailed);

        function getDevisComplete(response) {
            return response.data.SUCCESS;
        }

        function getDevisFailed(error) {
            return console.log(error);
        }
    }
    function getDevisList(){
        return $http.get("/api/DevisList")
            .then(getDevisListComplete)
            .catch(getDevisListFailed);

        function getDevisListComplete(response) {
            console.log("GetDevislist:",response);
            return response.data;
        }

        function getDevisListFailed(error) {
            return console.log(error);
        }
    }
    function setDevis(devis) {
        return $http.post("/api/Devis", devis)
        .then(setDevisComplete)
        .catch(setDevisFailed);

        function setDevisComplete(response) {
            return response.data.SUCCESS;
        }

        function setDevisFailed(error) {
            return console.log(error);
        }
    }
    function getAnneeDevisList(){
        return $http.get("/api/DevisList/Annee")
            .then(getAnneeDevisListComplete)
            .catch(getAnneeDevisListFailed);

        function getAnneeDevisListComplete(response) {
            return response.data.SUCCESS;
        }

        function getAnneeDevisListFailed(error) {
            return console.log(error);
        }
    }
    function getMoisDevisList(){
        return $http.get("/api/DevisList/Mois")
            .then(getMoisDevisListComplete)
            .catch(getMoisDevisListFailed);

        function getMoisDevisListComplete(response) {
            return response.data.SUCCESS;
        }

        function getMoisDevisListFailed(error) {
            return console.log(error);
        }
    }
    function getJourDevisList(obj){
        return $http.post("/api/DevisList/Jour", obj)
            .then(getJourDevisListComplete)
            .catch(getJourDevisListFailed);

        function getJourDevisListComplete(response) {
            return response.data.SUCCESS;
        }

        function getJourDevisListFailed(error) {
            return console.log(error);
        }
    }
    function getJourDevisList2(obj){
        return $http.post("/api/DevisList/Jour2", obj)
            .then(getJourDevisListComplete)
            .catch(getJourDevisListFailed);

        function getJourDevisListComplete(response) {
            return response.data.SUCCESS;
        }

        function getJourDevisListFailed(error) {
            return console.log(error);
        }
    }

}