import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {

  private baseUrl = 'http://localhost:3000/periode-travail';

  constructor(private http: HttpClient) { }

  getAllPeriodeTravail(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getPeriodeTravailById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getIdByDates(startDate: Date, finishDate: Date): Observable<any> {
    const url = `${this.baseUrl}/${startDate}/${finishDate}/id`;
    return this.http.get<any>(url);
  }

  getLastItemId(): Observable<any> {
    const url = `${this.baseUrl}/last-item-id`;
    return this.http.get<any>(url);
  }  

  createPeriodeTravail(dateDebut: Date, dateFin: Date, idHoraire: string): Observable<any> {
    const body = { dateDebut, dateFin, idHoraire };
    return this.http.post(`${this.baseUrl}`, body);
  }

  updatePeriodeTravail(id: string, dateDebut: Date, dateFin: Date, idHoraire: string): Observable<any> {
    const body = { dateDebut, dateFin, idHoraire };
    return this.http.put(`${this.baseUrl}/${id}`, body);
  }

  deletePeriodeTravail(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
