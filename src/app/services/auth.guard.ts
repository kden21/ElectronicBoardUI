import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {IUser} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public user:IUser|null

  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.user=JSON.parse(localStorage.getItem('user')!)
    if(this.user!==null)
    {
      return true;
    }

    this.router.navigateByUrl('/account/login')
    return false;
  }


}
