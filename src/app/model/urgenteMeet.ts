import { Time } from "@angular/common";
import { Slot } from "./slot";
import { Team } from "./team";
import { Topic } from "./topic";

export enum MeetingState {
    planned = 'crée',
    progress = 'en cours',
    accomplished = 'réalisé'
}

export class UrgenteMeet {
    title: string;
    objective : string;
    team: Team;
    slot : Slot;
    duration : Time ;
    finishTime : Time;
    topics : Topic[];
    state : MeetingState;
  
    constructor(title: string, objective: string,team: Team,slot : Slot ,duration : Time ,finishTime : Time ,topics : Topic[] , state: MeetingState) {
      this.title = title;
      this.objective = objective;
      this.team = team;
      this.slot = slot;
      this.duration = duration;
      this.finishTime = finishTime;
      this.topics = topics;
      this.state = state;
    }
  
}