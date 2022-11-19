import{Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICategoryReport} from "../../models/reports/categoryReport";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CategoryReportService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ICategoryReport[]>{
    return this.http.get<ICategoryReport[]>(`${environment.apiUrl}/v1/categoryReports`)
  }

}
