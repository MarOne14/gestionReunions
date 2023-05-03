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

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.baseUrl);
  }

  addTopic(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(this.baseUrl, topic);
  }

  saveTopics(topics: Topic[]): Observable<Topic[]> {
    const options = { headers: { 'Content-Type': 'application/json' } };
    return this.http.put<Topic[]>(`${this.baseUrl}/save`, topics, options);
  }
}
