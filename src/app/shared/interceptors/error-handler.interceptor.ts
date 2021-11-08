import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxNotifierService } from 'ngx-notifier';
import { NotificationService } from '../components/ospo/notification/services/notification.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private readonly notifications: NgxNotifierService,
    private readonly notificationService: NotificationService,
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          timer().subscribe(_ => {
            if (err instanceof HttpErrorResponse && err.status >= 400 && err.status !== 404) {
              this.notificationService.invoke({
                title: `Error ${err.status}`,
                description: err.message,
              });
            }
          });

          return throwError(err);
        }),
      );
  }
}
