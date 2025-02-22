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

  getSujetsByTitle(titre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/titre/${titre}`);
  }

  getLastSujetItemId(): Observable<any> {
    const url = `${this.baseUrl}/id/last`;
    return this.http.get<any>(url);
  }
  
  createSubject(subject: any): Observable<any>  {
    return this.http.post(`${this.baseUrl}`, subject , { responseType: 'text' });
  }

  updateSubject(id: string, subject: any): Observable<any>  {
    return this.http.put(`${this.baseUrl}/${id}`, subject);
  }

  deleteSubject(id: string): Observable<any>  {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
