import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err=>{
      if([err.status===401||err.status===403]) {
        alert("Пользователь не авторизован")
      }else if([err.status===400||err.status===500]){
        alert("400 или 500")
      }
      return throwError(err);
    }));
  }
}
