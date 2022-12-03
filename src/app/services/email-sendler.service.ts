import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class EmailSendlerService {

  constructor(private http: HttpClient) {
  }

  confirmEmail(accountId:number, userCode:number){
    /*let params = new HttpParams();
    if (userCode != null)
      params = params.set("userCode", userCode);*/
    return this.http.post(`${environment.apiUrl}/v1/account/${accountId}/emailConfirm`, userCode)
  }

}
