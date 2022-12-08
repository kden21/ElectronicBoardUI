import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IUser, StatusRole} from "../models/user";
import {StatusUser, UserFilter} from "../models/filters/userFilter";
import {environment} from "../../environments/environment";
import {AdvtService} from "./advt.service";
import {Status} from "../models/filters/advtFilter";
import {CreateConversationRequest} from "../models/chat/create-conversation-request";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  createConversation(request: CreateConversationRequest){
    return this.http.post<number>(`${environment.apiUrl}/v1/chat`, request)
  }

}
