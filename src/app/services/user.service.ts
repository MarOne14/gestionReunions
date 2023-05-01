import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { User } from '../model/user';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl ='http://localhost:3000';

  /* npx json-server --watch db.json */
  error: string;

  constructor(private http: HttpClient ) { }
  

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
  
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      map(users => users.find(user => user.email === email))
    );
  }


  createUser(user: User, account: Account): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user).pipe(
      switchMap(() => this.http.post(`${this.baseUrl}/accounts`, account))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users`);
  }

}
