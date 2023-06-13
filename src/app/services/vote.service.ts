import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private baseUrl = 'http://localhost:3000/votes';

  constructor(private http: HttpClient) { }

  getAllVotes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getVoteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createVote(vote: any): Observable<any> {
    return this.http.post(this.baseUrl, vote,{ responseType: 'text' });
  }

  updateVote(id: number, vote: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, vote);
  }

  deleteVote(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getVotesByCreneauId(idCreneau: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/creneau/${idCreneau}`);
  }

  getVotesByCompteId(idCompte: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/compte/${idCompte}`);
  }

  getVotesByCreneauAndCompteId(idCreneau: number, idCompte: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/creneau/${idCreneau}/compte/${idCompte}`);
  }
  
}
