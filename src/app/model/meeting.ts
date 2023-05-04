import { Time } from "@angular/common";
import { Slot } from "./slot";
import { Team } from "./team";
import { Topic } from "./topic";

export enum MeetingType {
  URGENT = 'urgent',
  SCHEDEULE = 'schedule'
}

export enum MeetingState {
  planned = 'planifié',
  accomplished = 'réalisé'
}

export class Meeting {
  title: string;
  objective: string;
  type: MeetingType;
  team: Team;
  slot : Slot;
  duration : Time ;
  topics:Topic[];
  state: MeetingState;

  constructor(title: string, objective: string, type: MeetingType,team: Team, topics:Topic[], state: MeetingState) {
    this.title = title;
    this.objective = objective;
    this.type = type;
    this.team = team;
    this.topics = topics;
    this.state = state;
  }

}