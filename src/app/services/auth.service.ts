import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
  }
  
}
