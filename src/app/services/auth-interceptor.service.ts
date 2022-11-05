import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = localStorage.getItem('user');
    if (user == null){
      return next.handle(req);
    }

    const authToken = JSON.parse(user)?.token;
    let authReq = req;

    if (req.url.includes(environment.apiUrl)) {
      authReq = authToken
        ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        })
        : req;
    }
    return next.handle(authReq);
  }
}
