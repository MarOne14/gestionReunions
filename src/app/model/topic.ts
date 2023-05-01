
export class Topic {
    title: string;
    presenter: String;
    duration: number;
    details:string;
  
    constructor(title: string, presenter: String, duration:number, details:string) {
      this.title = title;
      this.duration = duration;
      this.presenter = presenter;
      this.details = details;
    }
}
