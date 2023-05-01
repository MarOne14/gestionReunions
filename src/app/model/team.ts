import { User } from "./user";

export class Team {
    title: string;
    speciality: string;
    members: User[];
  
    constructor(title: string, speciality: string, members: User[]) {
      this.title = title;
      this.speciality = speciality;
      this.members = members;
    }
  }
  