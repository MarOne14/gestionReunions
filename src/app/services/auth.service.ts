import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl ='http://localhost:3000/users';

  /* npx json-server --watch db.json */

  private token: string;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post<any>(`${this.baseUrl}/auth/login`, body, { headers }).pipe(
      catchError(error => {
        console.log('Login error:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
}

isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser !== null;
}

getCurrentUser(): Observable<User> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        return of(currentUser);
    } else {
        return this.http.get<User>(`${this.baseUrl}/users/me`).pipe(
            tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }),
            catchError(error => {
                console.log('Error getting current user:', error);
                return of(null);
            })
        );
    }
}


  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }


  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  removeToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null;
  }
  
}
