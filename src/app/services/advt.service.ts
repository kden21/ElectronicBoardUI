import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAdvt} from "../models/advt";
import {AdvtFilter} from "../models/filters/advtFilter";

@Injectable({
  providedIn: 'root'
})

export class AdvtService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IAdvt[]> {
    return this.http.get<IAdvt[]>('https://localhost:7097/v1/advts')
  }

  getAllFilter(advtFilter: AdvtFilter): Observable<IAdvt[]> {

    return this.http.get<IAdvt[]>('https://localhost:7097/v1/advts/advtFilter/' +advtFilter)
  }

  getById(id: number): Observable<IAdvt> {
    return this.http.get<IAdvt>('https://localhost:7097/v1/advts/' + id)
  }

  create(advt: IAdvt): Observable<IAdvt> {
    return this.http.post<IAdvt>('https://localhost:7097/v1/advts/', advt)
  }
}
