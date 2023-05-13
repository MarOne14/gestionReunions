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

  getDayByYear(year: string): Observable<any>  {
    return this.http.get(`${this.baseUrl}/jours/${year}`);
  }

  getAllHolidays(): Observable<any>  {
    return this.http.get(`${this.baseUrl}/feries`);
  }

  getAllWorkingDays(): Observable<any>  {
    return this.http.get(`${this.baseUrl}/travail`);
  }

  insertDay(date: string, year: number): Observable<any> {
    const body = { date, year };
    return this.http.post(`${this.baseUrl}/jours`, body);
  }

  insertHoliday(date: string, title: string): Observable<any> {
    const body = { date, title };
    return this.http.post(`${this.baseUrl}/feriers`, body);
  }

  insertWorkingDay(date: string, startTime: string, endTime: string): Observable<any> {
    const body = { date, startTime, endTime };
    return this.http.post(`${this.baseUrl}/travail`, body);
  }

}
