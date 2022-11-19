import{Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAdvtReview} from "../../models/review/advtReview";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AdvtReviewService {

  constructor(private http: HttpClient) {
  }

  getAll(advtId: number): Observable<IAdvtReview[]>{
    return this.http.get<IAdvtReview[]>('https://localhost:7097/v1/advtReviews/advtReviewFilter?AdvtId=' + advtId)
  }

  createAdvtReview(model:IAdvtReview){
    return this.http.post(`${environment.apiUrl}/v1/advtReviews/`, model)
  }

}
