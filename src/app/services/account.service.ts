import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
  
  getAccountByUsername(email: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${email}`);
  }

  createUser(user: Account): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user );
  }

  updateUser(user: Account): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}`, user);
  }

  deleteUser(email : string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${email}`);
  }

}
