
export class Participation {
    idReunion:number;
    idCompte : number;
    idSujet : number;
    heureDebut : string;
    heureFin : string;
    ordre : number;
    duree : number;
    	
    constructor(idReunion:number, idCompte : number,idSujet : number , heureDebut : string , heureFin : string , ordre : number , duree : number) {
      this.idReunion = idReunion;
      this.idCompte = idCompte;
      this.idSujet = idSujet;
      this.heureDebut = heureDebut;
      this.heureFin = heureFin;
      this.ordre = ordre;
      this.duree = duree;

    }
  
}