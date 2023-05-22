import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreneauService {

  private baseUrl = 'http://localhost:3000/creneaux';

  constructor(private http: HttpClient) { }

  getAllCreneaux(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getCreneauxByReunionId(idReunion: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reunion/${idReunion}`);
  }

  createCreneau(creneau: any): Observable<any> {
    return this.http.post(this.baseUrl, creneau);
  }

  updateCreneau(id: number, creneau: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, creneau);
  }
}
