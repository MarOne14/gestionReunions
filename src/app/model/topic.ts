
export class Topic {
    title: string;
    presenter: String;
    duration: number;
    details:string;
    serialNumber: number;
  
    constructor(title: string, presenter: String, duration:number, details:string, serialNumber: number) {
      this.title = title;
      this.duration = duration;
      this.presenter = presenter;
      this.details = details;
      this.serialNumber = serialNumber;
    }
}
