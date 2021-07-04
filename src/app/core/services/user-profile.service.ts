import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../models/user-profile.model';

const BASE_PATH = environment.baseBath;


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {


  constructor(private http: HttpClient) { }


  getUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${BASE_PATH}/user_profiles`);
  }


  getUser(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${BASE_PATH}/user_profiles/${id}`);
  }


  createUsers(user: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${BASE_PATH}/user_profiles`, user);
  }


  updateUsers(id: number, user: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${BASE_PATH}/user_profiles/${id}`, user);
  }

  
  deleteUsers(id: number): Observable<any> {
    return this.http.delete(`${BASE_PATH}/user_profiles/${id}`);
  }

}
