import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = request.headers.append('Accept: "*/*"', 'no-cahe');
    headers = request.headers.append('Cache-control', 'no-store');
    headers = request.headers.append('Expires', '0');
    headers = request.headers.append('Pragma', 'no-cache');
    headers = request.headers.append('Content-type', 'application/json');
    let currentToken = this.authenticationService.currentTokenValue;
    if (currentToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentToken}`
        }
      });
    }

    return next.handle(request);
  }
}
