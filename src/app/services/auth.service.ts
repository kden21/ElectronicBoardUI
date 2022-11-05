import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {IAccount} from "../models/account";
import {UserService} from "./user.service";
import {IUser, StatusRole} from "../models/user";
import {ILoginResponse} from "../models/loginResponse";

@Injectable({
  providedIn: 'root'
})


export class AuthService{

  constructor(private http: HttpClient, private userService:UserService) {
  }
//todo:переделать тип возвращаемого объекта
  async login(account:IAccount){
    await this.http.post<ILoginResponse>('https://localhost:7097/v1/account/login', account).subscribe(response=> {
      if (response.userId !== undefined){
        this.userService.getById(response.userId).subscribe( user => {
          user.token = response.jwtToken;
          localStorage.setItem('user', JSON.stringify(user));
          window.location.reload();
        });
      }
    });
  }

  register(account:IAccount): Observable<IAccount>{
    return this.http.post<IAccount>('https://localhost:7097/v1/account/register', account);
  }


}
