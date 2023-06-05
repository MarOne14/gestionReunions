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

  getDaysByYear(year: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/jours/${year}`);
  }

  createDay(date: string, year: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/jours/${date}/${year}`, null);
  }

  getAllHolidays(): Observable<any> {
    return this.http.get(`${this.baseUrl}/feries`);
  }

  getHolidayByDate(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/feries/${date}`);
  }

  createHoliday(date: string, title: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/feries/${date}/${title}`, null);
  }

  getAllWorkingDays(): Observable<any> {
    return this.http.get(`${this.baseUrl}/travail`);
  }

  getPeriodIdWorkingdayByDate(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/travail/id/${date}`);
  }

  createWorkingDay(date: string, idPeriod: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/travail/${date}/${idPeriod}`, null);
  }

  deleteWorkingDay(day: Date): Observable<any> {
    const formattedDate = day.toISOString().substring(0, 10);
    return this.http.delete(`${this.baseUrl}/travail/${formattedDate}`);
  }
}
