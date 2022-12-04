import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PasswordRecovery} from "../models/email-sendler/password-recovery";
import {IAccount} from "../models/account";

@Injectable({
  providedIn: 'root'
})

export class EmailSendlerService {

  constructor(private http: HttpClient) {
  }

  confirmEmail(accountId:number, userCode:number){
    return this.http.post(`${environment.apiUrl}/v1/account/${accountId}/emailConfirm`, userCode)
  }

  passwordRecovery(model:PasswordRecovery){
    return this.http.post<number>(`${environment.apiUrl}/v1/account/password_recovery`,model )
  }

  passwordChange(model:IAccount){
    return this.http.put(`${environment.apiUrl}/v1/account/${model.id}/password_change`, model)
  }
}
