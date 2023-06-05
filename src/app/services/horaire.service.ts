import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  private baseUrl = 'http://localhost:3000/horaire-travail';

  constructor(private http: HttpClient) { }

  getAllHoraireTravail(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getHoraireTravailById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getLastHoraireTravailItemId(): Observable<any> {
    const url = `${this.baseUrl}/id/last`;
    return this.http.get<any>(url);
  }

  createHoraireTravail(heureDebut: Time, heureFin: Time): Observable<any> {
    const body = { heureDebut: heureDebut, heureFin: heureFin };
    return this.http.post(`${this.baseUrl}/${heureDebut}/${heureFin}`, body, { responseType: 'json' });
  }
  

  updateHoraireTravail(id: string, heureDebut: Time, heureFin: Time): Observable<any> {
    const body = { heureDebut: heureDebut, heureFin: heureFin};
    return this.http.put(`${this.baseUrl}/${id}/${heureDebut}/${heureFin}`, body);
  }

  deleteHoraireTravail(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
