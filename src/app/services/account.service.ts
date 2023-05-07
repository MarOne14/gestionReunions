import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl ='http://localhost:3000/account';

  constructor(private http: HttpClient) { }


  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}`);
  }
  
  getAccountByUsername(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${email}`);
  }

  createAccount(user: Account): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user );
  }

  updateAccount(user: Account): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}`, user);
  }

  deleteAccount(email : string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${email}`);
  }

}
