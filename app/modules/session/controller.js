SessionController.$inject = ["SessionService"];

function SessionController (SessionService) {
    return {
        create : create,
        destroy : destroy
    };
    function create (token,name) {
        SessionService.setToken(token);
        SessionService.setName(name);
        SessionService.setIslogedIn(true);
    }
    function destroy(){
        SessionService.setIslogedIn(false);
    }
}