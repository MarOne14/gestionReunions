import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipationTopicService {

  private baseUrl = 'http://localhost:3000/participationsujet';

  constructor(private http: HttpClient) {}

  createParticipationSujet(participationSujet: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, participationSujet);
  }

  getParticipationSujetById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateParticipationSujet(id: number, participationSujet: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, participationSujet);
  }

  deleteParticipationSujet(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
