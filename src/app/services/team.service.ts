import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, forkJoin, map, switchMap, tap, throwError } from 'rxjs';
import { Team } from '../model/team';
import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl ='http://localhost:3000/teams';
  allusers: User[];
  teams: Team[];

  constructor(private http: HttpClient, private userService: UserService) { 
  }
  

  getTeamByTitle(title: string): Observable<Team> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => {
        const team = response.teams.find(t => t.title === title);
        if (!team) {
          throw new Error(`Team with title '${title}' not found`);
        }
        return team;
      })
    );
  }
  
  getTeamMembersByTitle(title: string): Observable<User[]> {
    return this.getTeamByTitle(title).pipe(
      map(team => team.members)
    );
  }

  getTeamMembersddd(teamTitle: string): Observable<User[]> {
    return this.getAllTeams().pipe(
      tap(teams => console.log('Teams:', teams)),
      map(teams => teams.find(team => team.title === teamTitle)),
      map(team => team ? team.members : [])
    );
  }
  getTeamMembers(teamTitle: string): Observable<User[]> {
    return this.getAllTeams().pipe(
      map(teams => teams.find(team => team.title === teamTitle)),
      tap(team => console.log('Team:', team)),
      map(team => team && team.members ? team.members : [])
    );
  }
  


 getAllTeams(): Observable<Team[]> {
  return forkJoin([
    this.userService.getAllUsers(),
    this.http.get<Team[]>(`${this.baseUrl}`)
  ]).pipe(
    map(([users, teams]) => {
      return teams.map((team: Team) => {
        const usersWithEmailsInTeam = users.filter(user => team.members.includes(user));
        const t1: Team = {
          title: team.title,
          speciality: team.speciality,
          members: usersWithEmailsInTeam
        };
        return t1;
      });
    }),
    catchError((error: any) => {
      console.error(error);
      return throwError('An error occurred while fetching teams.');
    })
  );
}




}