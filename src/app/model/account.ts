export class Account {
    email: string;
    password: string;
    role: 'administrateur' | 'organisateur' | 'participant';

    constructor(email: string, password: string, role : string) 
    {
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
