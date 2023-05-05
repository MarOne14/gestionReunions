import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl ='http://localhost:3000/accounts';

  constructor(private http: HttpClient) { }


  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}`);
  }
  
  getUserByEmail(email: string): Observable<Account> {
    return this.http.get<Account[]>(this.baseUrl).pipe(
      map(users => users.find(user => user.username === email))
    );
  }

  updateaAcount(user: Account): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}`, user);
  }

}
