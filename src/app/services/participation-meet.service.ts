import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipationMeetService {

  private baseUrl = 'http://localhost:3000/participationreunion';

  constructor(private http: HttpClient) {}

  createParticipationReunion(participationReunion: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, participationReunion);
  }

  getParticipationReunionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateParticipationReunion(id: number, participationReunion: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, participationReunion);
  }

  deleteParticipationReunion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
