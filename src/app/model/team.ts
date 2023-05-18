import { Account } from "./account";

export class Team {
    title: string;
    members: Account[];
  
    constructor(title: string, members: Account[]) {
      this.title = title;
      this.members = members;
    }
  }
  