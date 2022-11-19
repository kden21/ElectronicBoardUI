import{Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserReview} from "../../models/review/userReview";
import {IAdvtReview} from "../../models/review/advtReview";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserReviewService {

  constructor(private http: HttpClient) {
  }

  getAll(userId: number): Observable<IUserReview[]>{
    return this.http.get<IUserReview[]>('https://localhost:7097/v1/userReviews/filter?UserReviewId=' + userId)
  }
  createUserReview(model:IUserReview){
    return this.http.post(`${environment.apiUrl}/v1/userReviews/`, model)
  }

}
