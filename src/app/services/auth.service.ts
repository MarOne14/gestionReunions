import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl ='http://localhost:3000/accounts';

  /* npx json-server --watch db.json */

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient,private router: Router) {
    // Check localStorage for authentication status on page load
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.isLoggedInSubject.next(isAuthenticated);
  }

  authenticate(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}?username=${email}&password=${password}`;
    return this.http.get(url).pipe(
      map((users: any) => users.length > 0),
    );
  }

  login() {
    // Set isAuthenticated to true and store in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    this.isLoggedInSubject.next(true);
    this.router.navigate(['/menu']);
  }

  logout() {
    // Set isAuthenticated to false and remove from localStorage
    localStorage.removeItem('isAuthenticated');
    this.isLoggedInSubject.next(false);
    localStorage.setItem('userId', null);
    this.router.navigate(['/login']);
  }
  
}
