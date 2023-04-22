export class User {
    nom: string;
    prenom: string;
    telephone: number;
    email: string;
    password: string;

    constructor(nom: string, prenom: string, telephone: number, email: string, password: string) 
    {
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.email = email;
        this.password = password;
    }
}
