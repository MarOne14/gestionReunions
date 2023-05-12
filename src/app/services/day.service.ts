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
    return this.http.get(`${this.baseUrl}/days`);
  }

  getAllHolidays(): Observable<any> {
    return this.http.get(`${this.baseUrl}/holidays`);
  }

  getAllWorkingDays(): Observable<any> {
    return this.http.get(`${this.baseUrl}/workingdays`);
  }

  getAllMeetingDays(): Observable<any> {
    return this.http.get(`${this.baseUrl}/meetingdays`);
  }

  insertDay(date: string, year: number): Observable<any> {
    const body = { date, year };
    return this.http.post(`${this.baseUrl}/days`, body);
  }

  insertHoliday(date: string, title: string): Observable<any> {
    const body = { date, title };
    return this.http.post(`${this.baseUrl}/holidays`, body);
  }

  insertWorkingDay(date: string, startTime: string, endTime: string): Observable<any> {
    const body = { date, startTime, endTime };
    return this.http.post(`${this.baseUrl}/workingdays`, body);
  }

  insertMeetingDay(date: string): Observable<any> {
    const body = { date };
    return this.http.post(`${this.baseUrl}/meetingdays`, body);
  }
}
