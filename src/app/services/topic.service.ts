import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../model/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private baseUrl ='http://localhost:3000/topics';

  constructor(private http: HttpClient ) { }

  getMeetings(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.baseUrl);
  }

  addMeeting(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(this.baseUrl, topic);
  }

}
