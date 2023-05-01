export enum MeetingType {
  URGENT = 'urgent',
  PLANIFIE = 'planifié'
}

export class Meeting {
  title: string;
  objective: string;
  type: MeetingType;

  constructor(title: string, objective: string, type: MeetingType) {
    this.title = title;
    this.objective = objective;
    this.type = type;
  }
}