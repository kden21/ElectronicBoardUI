import {Injectable} from '@angular/core';
import {MessageModel} from "../models/chat/message-model";
import * as signalR from "@microsoft/signalr"
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public messageList: MessageModel[];
  public message: MessageModel;
  private hubConnection: signalR.HubConnection
  public startConnection(conversationId:number) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chat`)
      .build();
    this.hubConnection
      .start()
      .then(() => {console.log('Connection started'); this.connectChat(conversationId);})
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public stopConnection(){
    if (this.hubConnection){
      this.hubConnection.stop()
        .then(() => {console.log('Connection stoped');})
        .catch(err => console.log('Error while stoped connection: ' + err));
    }
  }

  public addReceiveListener(func: Function) {
    this.hubConnection.on('Receive', (data) => {

      this.message = data;
      func(this.message)
    });
  }

  public addReceiveAllListener(func: Function){
    this.hubConnection.on('ReceiveAll', (data) => {
      this.messageList = data;
      func(this.messageList)
    });
  }

  public sendMessage(message: MessageModel) {
    if (this.hubConnection) {
      this.hubConnection.send('Send', message);
    }
  }

  public connectChat(conversationId:number) {
    if (this.hubConnection) {
      this.hubConnection.send('Connect', conversationId);
    }
  }
}
