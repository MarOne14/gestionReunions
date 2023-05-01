export enum RoleType {
    PART = 'participant',
    ORG = 'organisatuer',
    ADM = 'administrateur'
  }

export class Account {
    username: string;
    password: string;
    role: RoleType;

    constructor(username: string, password: string, role : RoleType) 
    {
        this.username = username;
        this.password = password;
        this.role = role;
    }

}
