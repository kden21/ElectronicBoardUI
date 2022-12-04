import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {IUser, StatusRole} from "../models/user";
import {AuthService} from "./auth.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public user:IUser|null

  constructor(private authService: AuthService, private router: Router, private nzNotificationService:NzNotificationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.user=JSON.parse(localStorage.getItem('user')!)
    if(this.user?.role==StatusRole.Admin)
    {
      return true;
    }

    this.nzNotificationService.error('Ошибка', "Вам недоступна эта страница")
    this.router.navigateByUrl('/')
    return false;
  }

}
