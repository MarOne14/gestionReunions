import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl ='http://localhost:3000/users';

  /* npx json-server --watch db.json */
  error: string;

  constructor(private http: HttpClient , private authService : AuthService) { }
  

  
  getAllUsers(): Observable<User[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<User[]>(`${this.baseUrl}`, { headers });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${email}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
    
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.nom}`, user);
    
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
