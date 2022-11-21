import{Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IAdvtReport} from "../../models/reports/advtReport";
import {UserReportFilter} from "../../models/filters/reports/userReportFilter";
import {IUserReport} from "../../models/reports/userReport";
import {AdvtReportFilter} from "../../models/filters/reports/adReportFilter";

@Injectable({
  providedIn: 'root'
})

export class AdvtReportService {

  constructor(private http: HttpClient) {
  }

  createAdvtReport(model: IAdvtReport){
    return this.http.post(`${environment.apiUrl}/v1/advtReports/`, model)
  }

  getAll(advtReportFilter:AdvtReportFilter): Observable<IAdvtReport[]> {
    let params = new HttpParams();
    if(advtReportFilter.status!=null)
      params=params.set("StatusCheck", advtReportFilter.status);
    return this.http.get<IAdvtReport[]>(`${environment.apiUrl}/v1/advtReports/advtReportFilter`, {params} );

  }

  updateAdvtReport(model: IAdvtReport){
    return this.http.put(`${environment.apiUrl}/v1/advtReports/${model.id}`, model);

  }
}
