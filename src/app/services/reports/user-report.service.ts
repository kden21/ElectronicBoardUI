import{Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserReport} from "../../models/reports/userReport";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserReportService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IUserReport[]>{
    return this.http.get<IUserReport[]>(`${environment.apiUrl}/v1/userReports/userReportFilter`)
  }

  createUserReport(model: IUserReport){
    return this.http.post(`${environment.apiUrl}/v1/userReports/`, model)
  }

}
