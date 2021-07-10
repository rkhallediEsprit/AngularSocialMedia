import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/credentials.model';
import * as bcrypt from 'bcryptjs';

const BASE_PATH = environment.baseBath;


@Injectable({
  providedIn: 'root'
})
export class CredentialsService {


  constructor(private http: HttpClient) { }


  getCredentials(): Observable<Credentials[]> {
    return this.http.get<Credentials[]>(`${BASE_PATH}/credentials`);
  }


  getCredential(id: number): Observable<Credentials> {
    return this.http.get<Credentials>(`${BASE_PATH}/credentials/${id}`);
  }

  createCredential(credential: Credentials): Observable<Credentials> {
    credential.password =  bcrypt.hashSync(credential.password, 12);
    return this.http.post<Credentials>(`${BASE_PATH}/credentials`, credential);
  }


  updateCredential(id: number, credential: Credentials): Observable<Credentials> {
    credential.password =  bcrypt.hashSync(credential.password, 12);
    return this.http.put<Credentials>(`${BASE_PATH}/credentials/${id}`, credential);
  }

  
  deleteCredential(id: number): Observable<any> {
    return this.http.delete(`${BASE_PATH}/credentials/${id}`);
  }

}