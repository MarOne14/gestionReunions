import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipationNoteService {

  private baseUrl = 'http://localhost:3000/participationnote';

  constructor(private http: HttpClient) {}

  createParticipationNote(participationNote: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, participationNote);
  }

  getParticipationNoteById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateParticipationNote(id: number, participationNote: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, participationNote);
  }

  deleteParticipationNote(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
