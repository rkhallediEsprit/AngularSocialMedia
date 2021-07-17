import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { MatDialog } from '@angular/material';
import { HttpResponseDialogComponent } from 'src/app/shared/components/http-response-dialog/http-response-dialog.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, public dialog: MatDialog) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (!request.url.includes('checkUsername')) {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    setTimeout(() => {
                        location.reload(true);
                    }, 1500)
                }

                const error = err.error.message || err.statusText;
                this.openLoginFailedDialog(error);
                return throwError(error);
            }
        }))
    }


    openLoginFailedDialog(message: string) {
        this.dialog.open(HttpResponseDialogComponent, {
            data: message,
        })
        setTimeout(() => {
            this.dialog.closeAll();
        }, 5000)
    }
}