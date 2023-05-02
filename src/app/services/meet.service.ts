import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '../model/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetService {

  private baseUrl ='http://localhost:3000/meetings';

  constructor(private http: HttpClient ) { }

  getMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.baseUrl);
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(this.baseUrl, meeting);
  }


}
