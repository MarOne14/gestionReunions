import { Time } from "@angular/common";

export class UrgentMeet {
    title: string;
    objective : string;
    idEquipe : number;
    duration : Time ;
    finishTime : Time;
  
    constructor(title: string, objective: string,idEquipe : number,duration : Time ,finishTime : Time ) {
      this.title = title;
      this.objective = objective;
      this.idEquipe = idEquipe;
      this.duration = duration;
      this.finishTime = finishTime;
    }
  
}