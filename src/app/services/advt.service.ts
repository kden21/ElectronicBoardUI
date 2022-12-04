import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAdvt, StatusAdvt} from "../models/advt";
import {AdvtFilter} from "../models/filters/advtFilter";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AdvtService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IAdvt[]> {
    return this.http.get<IAdvt[]>(`${environment.apiUrl}/v1/advts`)
  }

  getAllFilter(advtFilter: AdvtFilter): Observable<IAdvt[]> {

    let params = new HttpParams();
    if (advtFilter.userId != null)
      params = params.set("UserId", advtFilter.userId);
    if (advtFilter.categoryId != null && advtFilter.categoryId != 0)
      params = params.set("CategoryId", advtFilter.categoryId);
    if (advtFilter.count != null)
      params = params.set("Count", advtFilter.count);
    if (advtFilter.location != null)
      params = params.set("location", advtFilter.location);
    if (advtFilter.description != null)
      params = params.set("description", advtFilter.description);
    if (advtFilter.status != null)
      params = params.set("status", advtFilter.status);
    if (advtFilter.count != null)
      params = params.set("count", advtFilter.count);
    if (advtFilter.lastAdvtId != null)
      params = params.set("lastAdvtId", advtFilter.lastAdvtId)
    if(advtFilter.isExistPhoto!=null)
      params=params.set("photo", advtFilter.isExistPhoto)
    if(advtFilter.userVoter!=null)
      params=params.set("userVoter", advtFilter.userVoter)
    return this.http.get<IAdvt[]>(`${environment.apiUrl}/v1/advts/advtFilter`, {params});

  }

  getById(id: number): Observable<IAdvt> {
    return this.http.get<IAdvt>(`${environment.apiUrl}/v1/advts/` + id)
  }

  create(advt: IAdvt): Observable<IAdvt> {
    return this.http.post<IAdvt>('https://localhost:7097/v1/advts/', advt)
  }

  deleteAdvt(advtId: number) {
    return this.http.delete(`${environment.apiUrl}/v1/advts/` + advtId)
  }

  updateFavoriteAdvt(advtId: number, userId: number, status:StatusAdvt) {
    let params = new HttpParams();
    if (status != null)
      params = params.set("status", status);
    return this.http.put(`${environment.apiUrl}/v1/advts/`+advtId+'/'+userId, advtId,{params})
  }

  updateAdvt(advtId:number, model:IAdvt){
    return this.http.put(`${environment.apiUrl}/v1/advts/`+advtId, model)
  }
}
