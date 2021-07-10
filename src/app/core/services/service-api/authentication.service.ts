import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../../models/user-profile.model';
import { UserProfileService } from '../user-profile.service';

const BASE_PATH = environment.baseBath;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserProfile>;
  private currentTokenSubject: BehaviorSubject<string>;
  private currentUsernameSubject: BehaviorSubject<string>;
  public currentUser: Observable<UserProfile>;
  public currentUsername: Observable<string>;
  public currentToken: Observable<string>;

  constructor(private http: HttpClient, private userProfileService: UserProfileService) {
    this.currentUserSubject = new BehaviorSubject<UserProfile>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUsernameSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('loggedInUser')));
    this.currentUsername = this.currentUsernameSubject.asObservable();
    this.currentTokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('token')));
    this.currentToken = this.currentTokenSubject.asObservable();
  }


  public get currentUserValue(): UserProfile {
    return this.currentUserSubject.value;
  }
  public get currentUsernameValue(): string {
    return this.currentUsernameSubject.value;
  }
  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  authenticate(credential: { username: string, password: string }): Observable<any> {
    return this.http.post(`${BASE_PATH}/login_check`, credential);
  }

  async login(credential: { username: string, password: string }) {
    let token;
    let user;
    try {
      token = await this.authenticate(credential).toPromise();
      this.currentTokenSubject.next(token['token']);
      localStorage.setItem('token', JSON.stringify(token['token']));
      this.currentUsernameSubject.next(credential.username);
      localStorage.setItem('loggedInUser', JSON.stringify(credential.username));
      try {
        user = await this.userProfileService.getUserByCredentialUsername(credential.username).toPromise();
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      } catch (err) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUsernameSubject.next(null);
        this.currentTokenSubject.next(null);
        return err;
      }
    } catch (err) {
      return err;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    localStorage.removeItem('loggedInUser');
    this.currentUsernameSubject.next(null);
    localStorage.removeItem('token');
    this.currentTokenSubject.next(null);
  }
}
