import { Time } from "@angular/common";

export class Slot {
    date : Date;
    timeStart : Time ;

    constructor( date : Date , timeStart : Time){
        this.date = date;
        this.timeStart = timeStart;
    }
}
