import{Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserReport} from "../../models/reports/userReport";
import {environment} from "../../../environments/environment";
import {UserReportFilter} from "../../models/filters/reports/userReportFilter";

@Injectable({
  providedIn: 'root'
})

export class UserReportService {

  constructor(private http: HttpClient) {
  }

  getAll(userReportFilter:UserReportFilter): Observable<IUserReport[]> {

    let params = new HttpParams();
    if(userReportFilter.status!=null)
      params=params.set("StatusCheck", userReportFilter.status);
    return this.http.get<IUserReport[]>(`${environment.apiUrl}/v1/userReports/userReportFilter`, {params} );

  }

  createUserReport(model: IUserReport){
    return this.http.post(`${environment.apiUrl}/v1/userReports/`, model)
  }

  updateUserReport(model: IUserReport){
    return this.http.put(`${environment.apiUrl}/v1/userReports/${model.id}`, model);

  }
}
