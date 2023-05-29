import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  private baseUrl = 'http://localhost:3000/reunions';

  constructor(private http: HttpClient) {}

  getAllReunions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getReunionsByOrganisateur(idOrganisateur: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/organisateur/${idOrganisateur}`);
  }

  getReunionsByEquipe(idEquipe: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/equipe/${idEquipe}`);
  }

  getReunionsByType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/type/${type}`);
  }

  getReunionIdByTitle(title: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${title}`);
  }

  createReunion(reunion: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, reunion);
  }

  updateReunion(id: number, reunion: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, reunion);
  }

  deleteReunion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
