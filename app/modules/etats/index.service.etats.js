EtatsService.$inject = [];

function EtatsService () {
    return {
            get : function(){
                this.etatTableau = [
                        {id : "1", name : "Devis"},
                        {id : "2", name : "En cours de traitement"},
                        {id : "3", name : "Terminé"}
                    ];
                return this.etatTableau;
            }
        };
}