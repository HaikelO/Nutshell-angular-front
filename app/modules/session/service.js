SessionService.$inject = [];

function SessionService () {
    var name,token,islogedin;
    return {
        setName : setName,
        getName : getName,
        setToken : setToken,
        getToken : getToken,
        setIsLogedIn : setIsLogedIn,
        getIsLogedIn : getIsLogedIn
    };

    function setName (obj) {
        name = obj;
    }
    function getName () {
        return name;
    }
    function setToken (obj) {
        token = obj;
    }
    function getToken () {
        return token;
    }
    function setIsLogedIn (obj) {
        islogedin = obj;
    }
    function getIsLogedIn () {
        return islogedin;
    }
}