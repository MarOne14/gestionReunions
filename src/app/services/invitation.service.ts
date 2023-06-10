import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Invitation CRUD methods

  getAllInvitations() {
    return this.http.get(`${this.baseUrl}/invitations`);
  }

  getInvitationById(id: number) {
    return this.http.get(`${this.baseUrl}/invitations/${id}`);
  }

  createInvitation(invitation: any) {
    return this.http.post(`${this.baseUrl}/invitations`, invitation);
  }

  updateInvitation(id: number, invitation: any) {
    return this.http.put(`${this.baseUrl}/invitations/${id}`, invitation);
  }

  deleteInvitation(id: number) {
    return this.http.delete(`${this.baseUrl}/invitations/${id}`);
  }

  // NotificationParticipation CRUD methods

  getAllNotificationParticipations() {
    return this.http.get(`${this.baseUrl}/notificationparticipations`);
  }

  getNotificationParticipationById(id: number) {
    return this.http.get(`${this.baseUrl}/notificationparticipations/${id}`);
  }

  createNotificationParticipation(notificationParticipation: any) {
    return this.http.post(`${this.baseUrl}/notificationparticipations`, notificationParticipation , { responseType: 'text' });
  }

  updateNotificationParticipation(id: number, notificationParticipation: any) {
    return this.http.put(`${this.baseUrl}/notificationparticipations/${id}`, notificationParticipation);
  }

  deleteNotificationParticipation(id: number) {
    return this.http.delete(`${this.baseUrl}/notificationparticipations/${id}`);
  }
}
