import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService {

  cloneRequest: HttpRequest<any>;

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers.append('Accept: "*/*"', 'no-cahe');
    headers = req.headers.append('Cache-control', 'no-store');
    headers = req.headers.append('Expires', '0');
    headers = req.headers.append('Pragma', 'no-cache');
    headers = req.headers.append('Content-type', 'application/json');

    this.cloneRequest = req.clone();

    return next.handle(this.cloneRequest).pipe(
      tap((httpEvent: HttpEvent<any>) => {
        if(httpEvent instanceof HttpResponse) {
          const body = httpEvent.body;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err)
        if(err.status === 401 || err.status === 403){
          this.router.navigateByUrl('/');
        }
        return throwError(err);
      })
    )
  }
}
