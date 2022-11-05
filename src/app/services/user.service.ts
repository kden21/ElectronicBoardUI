import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser, StatusRole} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>('https://localhost:7097/v1/users')
  }

  getById(id: number): Observable<IUser> {
    return this.http.get<IUser>('https://localhost:7097/v1/users/' + id)
  }

  getViewUser(): IUser{
    let userView: IUser=JSON.parse(localStorage.getItem('user')!);
    if(userView==null){
      userView = new class implements IUser {
        accountId: number;
        birthday: Date;
        email: string;
        id: number;
        lastName: string;
        middleName: string;
        name: string;
        phoneNumber: string;
        photo: "";
        role: StatusRole;
      }
      userView.id=0;
      userView.role=StatusRole.Anon;
    }
   return userView;
  }
}
