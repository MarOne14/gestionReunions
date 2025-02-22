import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  private baseUrl = 'http://localhost:3000/reunions';
  title : string;
  etat : boolean;

  constructor(private http: HttpClient) {}

  setTitle(titre : string){
    this.title = titre;
    this.etat = false;
  }
  getTitle():string{
    return this.title;
  }
  getEtat():boolean{
    return this.etat;
  }
  setEtat(){
    this.etat = false;
  }

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
  
  getReunionsByEtat(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/etat/cree`);
  }

  getReunionByTitle(): Observable<any> {
    return this.http.get<number>(`${this.baseUrl}/title/${this.title}`);
  }

  getLastReunionItemId(): Observable<any> {
    const url = `${this.baseUrl}/id/last`;
    return this.http.get<any>(url);
  }

  createReunion(reunion: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, reunion ,{ responseType: 'text' });
  }

  updateReunion(id: number, reunion: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, reunion);
  }

  deleteReunion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  /* ReunionPlanifie endpoints */

  createReunionPlanifie(reunionPlanifie: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/planifie`, reunionPlanifie,{ responseType: 'text' });
  }

  updateReunionPlanifie(id: number, reunionPlanifie: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/planifie/${id}`, reunionPlanifie);
  }

  deleteReunionPlanifie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/planifie/${id}`);
  }

  /* ReunionUrgente endpoints */

  createReunionUrgente(reunionUrgente: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/urgente`, reunionUrgente,{ responseType: 'text' });
  }

  updateReunionUrgente(id: number, reunionUrgente: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/urgente/${id}`, reunionUrgente);
  }

  deleteReunionUrgente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/urgente/${id}`);
  }
}
