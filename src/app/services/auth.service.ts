import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, EMPTY, Observable, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {IAccount} from "../models/account";
import {UserService} from "./user.service";
import {ILoginResponse} from "../models/loginResponse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})


export class AuthService{
  public id$ = new BehaviorSubject<string | null>(this.id);
  public user$ = this.id$.pipe(switchMap(id => this.getSelfById(id)));

  get token(): string | null {
    return localStorage.getItem('token');
  }

  set token(value: string | null) {
    if (!value) {
      localStorage.removeItem('token');
      return;
    }
    localStorage.setItem('token', value);
  }
  get id(): string | null {
    return localStorage.getItem('id');
  }

  set id(value: string | null) {
    this.id$.next(value);
    if (!value) {
      localStorage.removeItem('id');
      return;
    }
    localStorage.setItem('id', value);
  }


  constructor(private http: HttpClient, private userService:UserService) {
  }
//todo:переделать тип возвращаемого объекта
  login(account:IAccount){
    this.http.post<ILoginResponse>('https://localhost:7097/v1/account/login', account).subscribe(response=> {
      if (response.userId !== undefined){
        this.userService.getById(response.userId).subscribe( user => {
          user.token = response.jwtToken;
          localStorage.setItem('user', JSON.stringify(user));
        });
      }
    });
  }

  // login(account:IAccount): Observable<any> {
  //   // Отправляем post запрос на url, в ответ нам приходит модель {
  //   //                                                              id: string,
  //   //                                                              token: string }
  //   //
  //   // Следовательно записываем токен в localStorage для отправки запросов с токеном. См AuthInterceptor, ошибки обрабатываются через ErrorInterceptor
  //   return this.http
  //     .post(`${environment.apiUrl}/v1/account/login`, account)
  //     .pipe(
  //       tap((res: any) => {
  //         this.token = res.token;
  //         this.id = res.id;
  //       })
  //     );
  // }



  register(account:IAccount): Observable<IAccount>{
    return this.http.post<IAccount>('https://localhost:7097/v1/account/register', account);
  }

  getSelfById(id: string | null): Observable<any> {
    if (!id) {
      return EMPTY;
    }
    return this.http
      .get(`${environment.apiUrl}/users/`, {
        params: {
          id
        }
      });
  }


}
