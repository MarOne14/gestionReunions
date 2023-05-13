import { Account } from "./account";

export class Team {
    title: string;
    speciality: string;
    members: Account[];
  
    constructor(title: string, speciality: string, members: Account[]) {
      this.title = title;
      this.speciality = speciality;
      this.members = members;
    }
  }
  