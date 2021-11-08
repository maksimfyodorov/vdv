import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatabaseModeService } from '../services/database-mode.service';

@Injectable()
export class DatabaseModeInterceptor implements HttpInterceptor{
  constructor(private databaseModeService: DatabaseModeService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modeHttpReq = req.clone({
      headers: req.headers.set('DB-Mode', this.databaseModeService.mode)
    });
    return next.handle(modeHttpReq);
  }
}

