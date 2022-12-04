import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {IAccount} from "../models/account";
import {UserService} from "./user.service";
import {ILoginResponse} from "../models/loginResponse";
import {environment} from "../../environments/environment";
import {LoginAccountRequest} from "../models/login-account-request";
import {IUser} from "../models/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userLogin$ = new BehaviorSubject<IUser | null>(JSON.parse(localStorage.getItem('user')!));

  constructor(private http: HttpClient,
              private userService: UserService,
              private router:Router) {
  }

  login(account: IAccount) {
    this.http.post<ILoginResponse>('https://localhost:7097/v1/account/login', account).subscribe(response => {
      if (response.userId !== undefined) {
        this.userService.getById(response.userId).subscribe(user => {
          user.token = response.jwtToken;
          localStorage.setItem('user', JSON.stringify(user));
          this.userLogin$.next(user);
        });
      }
    });
    this.router.navigateByUrl('/');
  }

  register(account: LoginAccountRequest): Observable<IAccount> {
    return this.http.post<IAccount>('https://localhost:7097/v1/account/register', account);
  }

  logout() {
    localStorage.removeItem('user');
    this.userLogin$.next(null);
  }

}
