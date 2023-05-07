import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl ='http://localhost:3000/personne';

  error: string;

  constructor(private http: HttpClient ) { }
  

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }
  
  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${email}`);
  }


  createUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}`, user);
  }

  deleteUser(email : string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${email}`);
  }

}
