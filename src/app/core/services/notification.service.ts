import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/notification.model';
const BASE_PATH = environment.baseBath;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${BASE_PATH}/notifications`);
  }

  getNotification(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${BASE_PATH}/notifications/${id}`);
  }


  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${BASE_PATH}/notifications`, notification);
  }


  updateNotification(id: number, notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${BASE_PATH}/notifications/${id}`, notification);
  }

  
  deletenotification(id: number): Observable<any> {
    return this.http.delete(`${BASE_PATH}/notifications/${id}`);
  }


}
