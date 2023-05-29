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

  createHoraireTravail(heureDebut: Time, heureFin: Time): Observable<any> {
    const body = { heureDebut, heureFin };
    return this.http.post(`${this.baseUrl}`, body);
  }

  updateHoraireTravail(id: string, heureDebut: Time, heureFin: Time): Observable<any> {
    const body = { heureDebut, heureFin };
    return this.http.put(`${this.baseUrl}/${id}`, body);
  }

  deleteHoraireTravail(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
