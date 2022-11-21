import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser, StatusRole} from "../models/user";
import {StatusUser, UserFilter} from "../models/filters/userFilter";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.apiUrl}/v1/users`)
  }

  getAllFilter(userFilter:UserFilter): Observable<IUser[]> {
    let params = new HttpParams();
    if(userFilter.status!=null)
      params=params.set("StatusUser", userFilter.status);
    return this.http.get<IUser[]>(`${environment.apiUrl}/v1/users/userFilter`,{params})
  }

  getById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/v1/users/${id}`)
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
        statusCheck:StatusUser.Actual;
      }
      userView.id=0;
      userView.role=StatusRole.Anon;
    }
   return userView;
  }
}
