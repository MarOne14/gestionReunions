import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Team } from '../model/team';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl ='http://localhost:3000';
  allusers: Account[];
  teams: Team[];
  teamTitle: string;

  constructor(private http: HttpClient) { }

  setTeamTitle(title: string): void {
    this.teamTitle = title;
  }

  getTeamTitle(): string {
    return this.teamTitle;
  }

  getAllTeams(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipe`);
  }

  getAllTeamsWithMembers() {
    return this.http.get(`${this.baseUrl}/equipe/membres`);
  }

  getTeamsForMember(email: string) {
    return this.http.get(`${this.baseUrl}/membre/${email}/equipes`);
  }
  

  getTeamByTitle(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipe/${title}`);
  }

  getTeamIdByTitle(teamTitle: string) {
    const url = `${this.baseUrl}/equipe/${teamTitle}/id`;
    return this.http.get<{ message: string, data: number }>(url);
  }

  getTeamMembers(teamId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipe/${teamId}/membres`);
  }

  addMemberToEquipe(equipeId: number, membreId: number): Observable<any> {
    const url = `${this.baseUrl}/equipe/${equipeId}/membre/${membreId}`;
    return this.http.post<any>(url, null);
  }

  createTeam(team: Team): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, team).pipe(
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }  

  updateTeam(teamId: number, title: string): Observable<any> {
    const body = { title };
  
    return this.http.put<any>(`${this.baseUrl}/${teamId}`, body).pipe(
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }
  
  deleteTeam(teamId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${teamId}`).pipe(
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }
  

} 