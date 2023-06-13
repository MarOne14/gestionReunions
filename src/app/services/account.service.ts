import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl ='http://localhost:3000/comptes';

  constructor(private http: HttpClient) { }


  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}`);
  }

  getAccountById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getAccountByEmail(email: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/email/${email}`);
  }

  getAccountRoleByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/email/role/${email}`);
  }
  
  getAccountIDByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/email/id/${email}`);
  }

  createAccount(account: Account): Observable<any> {
    return this.http.post(`${this.baseUrl}`, account);
  }

  updateAccount(id: any, account: any): Observable<any> {
    return this.http.put<Account>(`${this.baseUrl}/${id}`, account);
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
