import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private nzNotificationService:NzNotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err=>{

      if([err.status===401||err.status===403]) {
        this.nzNotificationService.create( 'error',`Ошибка${err.error?.name}`, err.error?.message,{
        })
      }
      else if([err.status===422]) {
        this.nzNotificationService.error('Ошибка22', err.error?.message)
      }
      else if([err.status===400||err.status===500]){
        this.nzNotificationService.error('Ошибка5', err.error?.message)
      }
      return throwError(err);
    }));
  }
}
