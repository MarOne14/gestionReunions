import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../model/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private baseUrl ='http://localhost:3000/sujets';

  constructor(private http: HttpClient ) { }

  getAllSubjects(): Observable<any>  {
    return this.http.get(`${this.baseUrl}`);
  }

  createSubject(subject: any): Observable<any>  {
    return this.http.post(`${this.baseUrl}`, subject);
  }

  updateSubject(id: string, subject: any): Observable<any>  {
    return this.http.put(`${this.baseUrl}/${id}`, subject);
  }

  deleteSubject(id: string): Observable<any>  {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
