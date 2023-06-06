
export enum MeetingState {
    onHold = "en attente",
    planned = 'crée',
    progress = 'en cours',
    accomplished = 'réalisé'
}

export class Meet {
    title: string;
    objective : string;
    idEquipe : number;
    idOrganisateur : number;
    duration : number ;
    state : MeetingState;
  
    constructor(title: string, objective: string,idEquipe : number , idOrganisateur : number ,duration : number , state: MeetingState) {
      this.title = title;
      this.objective = objective;
      this.idEquipe = idEquipe;
      this.idOrganisateur = idOrganisateur;
      this.duration = duration;
      this.state = state;
    }
}