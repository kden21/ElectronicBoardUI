import {Injectable} from '@angular/core';
import {MessageModel} from "../models/chat/message-model";
import * as signalR from "@microsoft/signalr"
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public data: MessageModel[];
  private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chat`)
      .build();
    this.hubConnection
      .start()
      .then(() => {console.log('Connection started'); this.connectChat();})
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addChatListener = () => {
    this.hubConnection.on('Receive', (data) => {
      this.data = data;
      console.log(data);
    });

    /*this.hubConnection.on('ReceiveAll', (data) => {
      this.data = data;
      console.log(data);
    });*/
  }

  public addReceiveListener(func: Function){
    this.hubConnection.on('ReceiveAll', (data) => {
      this.data = data;
      func(this.data)
    });
  }

  public sendMessage(message: MessageModel) {
    if (this.hubConnection) {
      this.hubConnection.send('Send', 'data');
    }
  }

  public connectChat() {
    if (this.hubConnection) {
      this.hubConnection.send('Connect');
    }
  }
}
