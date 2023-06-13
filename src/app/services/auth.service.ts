import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = 'http://localhost:3000/account';
  private tokenKey = 'token';
  private authenticated = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isNewUserSignedUp: boolean = false;

  constructor(private http: HttpClient) {}

  // Set the JWT token in local storage
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authenticated.next(true);
  }

  // Get the JWT token from local storage
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Clear the JWT token from local storage
  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.authenticated.next(false);
  }

  // Perform login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((data: any) => {
          if (data.token) {
            this.setToken(data.token);
            console.log('Token set:', data.token);
          console.log('Authenticated:', this.isAuthenticated());
          }
        }),
        catchError((error: any) => {
          console.log('Errorrr:', error);
          throw error; // Rethrow the error to be handled in the calling component
        })
      );
  }

  // Perform logout
  logout(): void {
    this.clearToken();
    localStorage.setItem('userId', null);
    this.isNewUserSignedUp = false;
  }

  // Make an authenticated request
  authenticatedRequest(url: string, options: any = {}): Observable<any> {
    const token = this.getToken();
    if (!options.headers) {
      options.headers = new HttpHeaders();
    }

    options.headers = options.headers.set('Authorization', `Bearer ${token}`);

    return this.http.request(options.method, url, options);
  }

  // Get the authenticated status as an observable
  isAuthenticated$(): Observable<boolean> {
    return this.authenticated.asObservable();
  }
  
  signup() : void{
    this.isNewUserSignedUp = true;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /**

  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;
  

  constructor() {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  isAuthenticated(): boolean {
    const userId = localStorage.getItem('userId');
    return !!userId;
  }

  login(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.isAuthenticatedSubject.next(false);
  }*/

   
  
}
