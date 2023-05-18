import { Document } from "./document";
import { Note } from "./note";

export class Topic {
    title: string;
    presenter: String;
    duration: number;
    details:string;
    serialNumber: number;
    noteTaken: Note
    docUsed: Document;
  
    constructor(title: string, presenter: String, duration:number, details:string, serialNumber: number, noteTaken: Note, docUsed: Document) {
      this.title = title;
      this.duration = duration;
      this.presenter = presenter;
      this.details = details;
      this.serialNumber = serialNumber;
      this.noteTaken = noteTaken;
      this.docUsed = docUsed;
    }
}
