import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private baseUrl = 'http://localhost:3000/participations';

  constructor(private http: HttpClient) { }

  getAllParticipations() {
    return this.http.get(this.baseUrl);
  }

  getParticipationById(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  getParticipationsByReunionId(reunionId: number) {
    const url = `${this.baseUrl}/reunion/${reunionId}`;
    return this.http.get(url);
  }

  getParticipationsByTeamId(teamId: number) {
    const url = `${this.baseUrl}/team/${teamId}`;
    return this.http.get(url);
  }

  getParticipationsByAccountId(accountId: number) {
    const url = `${this.baseUrl}/account/${accountId}`;
    return this.http.get(url);
  }

  createParticipation(participation: any) {
    return this.http.post(this.baseUrl, participation,{ responseType: 'text' });
  }

  updateParticipation(id: number, participation: any) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, participation);
  }

  deleteParticipation(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
