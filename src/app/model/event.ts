export enum EventType {
    JF = 'jourFerier',
    Meet = 'meeting',
}

export class Event {
    dateFr : Date ;
    title : string;
    type : EventType;

    constructor(dateFr : Date , title : string , type : EventType){
        this.dateFr = dateFr ;
        this.title = title ;
        this.type = type;
    }
}
