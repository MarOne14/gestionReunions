import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getNotificationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getNotificationsByReunionId(idReunion: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reunion/${idReunion}`);
  }

  getNotificationsByAccountId(idCompte: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/compte/${idCompte}`);
  }

  getNotificationsByReunionAndAccountIds(idReunion: number, idCompte: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reunion/${idReunion}/compte/${idCompte}`);
  }

  getLastnotificationItemId(): Observable<any> {
    const url = `${this.baseUrl}/id/last`;
    return this.http.get<any>(url);
  }
  
  createNotification(notification: Notification): Observable<any> {
    return this.http.post(`${this.baseUrl}`, notification);
  }

  updateNotification(id: number, notification: Notification): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, notification);
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  
}
