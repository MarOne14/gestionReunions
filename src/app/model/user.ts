export class User {
    nom: string;
    prenom: string;
    telephone: number;
    email: string;

    constructor(nom: string, prenom: string, telephone: number, email: string) 
    {
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.email = email;
    }
}
