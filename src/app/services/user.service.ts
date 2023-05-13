import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl ='http://localhost:3000/members';

  error: string;

  constructor(private http: HttpClient ) { }
  

  getAllMembers() {
    return this.http.get(`${this.baseUrl}`);
  }

  getMemberById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createMember(member: any) {
    return this.http.post(`${this.baseUrl}`, member);
  }

  updateMember(id: number, member: any) {
    return this.http.put(`${this.baseUrl}/${id}`, member);
  }

  deleteMember(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
