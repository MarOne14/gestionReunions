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

  getLastPeriodeTravailItemId(): Observable<any> {
    const url = `${this.baseUrl}/id/last`;
    return this.http.get<any>(url);
  }

  getIdByDates(startDate: Date, finishDate: Date): Observable<any> {
    const startDateString = startDate.toISOString().split('T')[0];
    const finishDateString = finishDate.toISOString().split('T')[0];
    const url = `${this.baseUrl}/${startDateString}/${finishDateString}/id`;
    return this.http.get<any>(url);
  }

  createPeriodeTravail(dateDebut: Date, dateFin: Date, idHoraire: string): Observable<any> {
    const dateDebutString = dateDebut.toISOString().split('T')[0];
    const dateFinString = dateFin.toISOString().split('T')[0];
    const url = `${this.baseUrl}/${dateDebutString}/${dateFinString}/${idHoraire}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }

  updatePeriodeTravail(id: string, dateDebut: Date, dateFin: Date, idHoraire: string): Observable<any> {
    const dateDebutString = dateDebut.toISOString().split('T')[0];
    const dateFinString = dateFin.toISOString().split('T')[0];
    const url = `${this.baseUrl}/${id}/${dateDebutString}/${dateFinString}/${idHoraire}`;
    return this.http.put(url, {});
  }

  deletePeriodeTravail(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
