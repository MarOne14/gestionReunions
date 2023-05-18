import { Time } from "@angular/common";
import { Slot } from "./slot";
import { Team } from "./team";
import { Topic } from "./topic";

export enum MeetingState {
  waiting = 'en attente',
  planned = 'crée',
  progress = 'en cours',
  accomplished = 'réalisé'
}

export class OrganisedMeet {
  title: string;
  objective : string;
  team: Team;
  slots : Slot[];
  date : Date;
  startTime : Time;
  finishTime : Time;
  duration : Time ;
  topics : Topic[];
  state : MeetingState;

  constructor(title: string, objective: string,team: Team,slots : Slot[] ,date : Date ,startTime : Time ,finishTime : Time ,duration : Time , topics : Topic[] , state: MeetingState) {
    this.title = title;
    this.objective = objective;
    this.team = team;
    this.slots = slots;
    this.startTime = startTime;
    this.finishTime = finishTime;
    this.date = date;
    this.duration = duration;
    this.topics = topics;
    this.state = state;
  }

}