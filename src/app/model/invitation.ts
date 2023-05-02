export enum InvType {
    en_cours = 'in progress',
    acceptee = 'accepted',
    refusee = 'refused'
}

export class Invitation {
    description : string;
    etat : InvType;
}
