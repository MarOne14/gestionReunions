import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl);
  }

  getNotificationById(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}/${id}`);
  }

  createNotification(notification: Notification): Observable<any> {
    return this.http.post(this.baseUrl, notification);
  }

  updateNotification(id: number, notification: Notification): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, notification);
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getNotificationsByReunionId(idReunion: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/reunion/${idReunion}`);
  }

  getNotificationsByCompteId(idCompte: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/compte/${idCompte}`);
  }

  getNotificationsByReunionAndCompteId(idReunion: number, idCompte: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/reunion/${idReunion}/compte/${idCompte}`);
  }
  
}
