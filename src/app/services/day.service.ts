import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  getAllDays(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jours`);
  }

  getDaysByYear(year: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/jours/${year}`);
  }

  createDay(date: string, year: string): Observable<any> {
    const body = { date, year };
    return this.http.post(`${this.baseUrl}/jours`, body);
  }

  getAllHolidays(): Observable<any> {
    return this.http.get(`${this.baseUrl}/feries`);
  }

  createHoliday(date: string, title: string): Observable<any> {
    const body = { date, title };
    return this.http.post(`${this.baseUrl}/feries`, body);
  }

  getAllWorkingDays(): Observable<any> {
    return this.http.get(`${this.baseUrl}/travail`);
  }

  createWorkingDay(date: string, idPeriod: string): Observable<any> {
    const body = { date, idPeriod };
    return this.http.post(`${this.baseUrl}/travail`, body);
  }

  deleteWorkingDay(day: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/travail/${day}`);
  }

}
