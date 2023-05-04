import { Time } from "@angular/common";

export class Slot {
    id : string;
    date : Date;
    timeStart : Time ;

    constructor(id : string , date : Date , timeStart : Time){
        this.id = id;
        this.date = date;
        this.timeStart = timeStart;
    }
}
