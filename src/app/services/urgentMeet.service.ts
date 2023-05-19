import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrgentMeet } from '../model/urgentMeet';

@Injectable({
  providedIn: 'root'
})
export class UrgentMeetService {

  private baseUrl ='http://localhost:3000/meetings';

  constructor(private http: HttpClient ) { }

  getMeetings(): Observable<UrgentMeet[]> {
    return this.http.get<UrgentMeet[]>(this.baseUrl);
  }

  addMeeting(meeting: UrgentMeet): Observable<UrgentMeet> {
    return this.http.post<UrgentMeet>(this.baseUrl, meeting);
  }


}
