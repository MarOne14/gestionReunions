export enum RoleType {
    PART = 'participant',
    ORG = 'organisatuer',
    ADM = 'administrateur'
  }

export class Account {
    nom: string;
    prenom: string;
    telephone: number;
    username: string;
    password: string;
    role: RoleType;

    constructor(nom: string,prenom: string,telephone: number,username: string, password: string, role : RoleType) 
    {
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.username = username;
        this.password = password;
        this.role = role;
    }

}
