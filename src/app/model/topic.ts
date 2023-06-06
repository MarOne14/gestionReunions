
export class Topic {
    id : number;
    title: string;
    presenter: String;
    duration: number;
    details:string;
    serialNumber: number;
  
    constructor(id : number , title: string, presenter: String, duration:number, details:string, serialNumber: number) {
      this.id = id;
      this.title = title;
      this.duration = duration;
      this.presenter = presenter;
      this.details = details;
      this.serialNumber = serialNumber;
    }
}
