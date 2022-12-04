import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IUser, StatusRole} from "../models/user";
import {StatusUser, UserFilter} from "../models/filters/userFilter";
import {environment} from "../../environments/environment";
import {AdvtService} from "./advt.service";
import {Status} from "../models/filters/advtFilter";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private advtService:AdvtService) {
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.apiUrl}/v1/users`)
  }

  getAllFilter(userFilter:UserFilter): Observable<IUser[]> {
    let params = new HttpParams();
    if(userFilter.advtFavoriteId!=null)
      params=params.set("AdvtFavoriteId", userFilter.advtFavoriteId);
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
        birthday: string;
        email: string;
        id: number;
        lastName: string;
        middleName: string;
        name: string;
        phoneNumber: string;
        photo: "";
        role: StatusRole;
        statusUser:StatusUser.Actual;
      }
      userView.id=0;
      userView.role=StatusRole.Anon;
    }
   return userView;
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('https://localhost:7097/v1/users/', user)
  }

  deleteUser(userId:number, isDeleted:BehaviorSubject<boolean>){
    return this.http.delete(`${environment.apiUrl}/v1/users/` + userId).subscribe(res=>{
      this.advtService.getAllFilter({
        status: Status.Actual,
        userId:userId
      }).subscribe(res=> {
          for (let item of res) {
            console.log(item.id+'id')
            this.advtService.deleteAdvt(item.id).subscribe(res=> isDeleted.next(true))
          }
        }
      )
    })
  }

  updateUser(userId:number,model:IUser){
    return this.http.put(`${environment.apiUrl}/v1/users/`+userId, model);
  }
}
