import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, switchMap } from 'rxjs';
import { Team } from '../model/team';
import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl ='http://localhost:3000/team';
  allusers: User[];
  teams: Team[];
  teamTitle: string;

  constructor(private http: HttpClient, private userService: UserService) { 

  }

  setTeamTitle(title: string): void {
    this.teamTitle = title;
  }

  getTeamTitle(): string {
    return this.teamTitle;
  }
  
  getAllTeams(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getTeamByTitle(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${title}`);
  }

  getTeamIdByTitle(teamTitle: string) {
    const url = `${this.baseUrl}/${teamTitle}/id`;
    return this.http.get<{ message: string, data: number }>(url);
  }


  getTeamMembersByTeamId(teamId: number) {
    const url = `${this.baseUrl}/${teamId}/members`;
    return this.http.get<{ message: string, data: string[] }>(url);
  }

  getTeamMembers(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${title}/members`);
  }
  getTeamMembersByTitle(teamTitle: string): Observable<User[]> {
    return this.http.get<any>(`${this.baseUrl}/${teamTitle}/members`).pipe(
      switchMap((emails: string[]) => {
        // Retrieve users based on the emails
        const getUserObservables: Observable<User>[] = emails.map(email => this.userService.getUserByEmail(email));
        return forkJoin(getUserObservables);
      }),
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }

  createTeam(team: Team): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, team).pipe(
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }

  updateTeam(teamTitle: string, team: Team): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${teamTitle}`, team).pipe(
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }

  deleteTeam(teamTitle: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${teamTitle}`).pipe(
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }

} 