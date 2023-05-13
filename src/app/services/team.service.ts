import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Team } from '../model/team';
import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl ='http://localhost:3000';
  allusers: User[];
  teams: Team[];
  teamTitle: string;

  constructor(private http: HttpClient, private userService: UserService) { }

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


  getTeamMembersByTeamId(teamId: number) {
    const url = `${this.baseUrl}/equipe/${teamId}/members`;
    return this.http.get<{ message: string, data: string[] }>(url);
  }

  getTeamMembers(teamId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipe/${teamId}/members`);
  }

  createTeam(team: Team): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, team).pipe(
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }  

  updateTeam(teamId: number, title: string, speciality: string): Observable<any> {
    const body = { title, speciality };
  
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