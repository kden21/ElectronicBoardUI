import{Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IAdvtReport} from "../../models/reports/advtReport";

@Injectable({
  providedIn: 'root'
})

export class AdvtReportService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IAdvtReport[]>{
    return this.http.get<IAdvtReport[]>(`${environment.apiUrl}/v1/advtReports/advtReportFilter`)
  }

  createAdvtReport(model: IAdvtReport){
    return this.http.post(`${environment.apiUrl}/v1/advtReports/`, model)
  }

}
