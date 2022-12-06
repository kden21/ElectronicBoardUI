import { Component, OnInit, NgZone } from '@angular/core';
import {SignalrService} from "../../services/signalr.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageModel} from "../../models/chat/message-model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagesList: BehaviorSubject<MessageModel[]>=new BehaviorSubject<MessageModel[]>([]);
  constructor(private signalRService:SignalrService, private http:HttpClient, public zone: NgZone) { }

  form = new FormGroup({
    text: new FormControl<string>(""),
  })

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addChatListener();
    this.signalRService.addReceiveListener((messages: MessageModel[]) => this.messagesList.next(messages));
    //this.startHttpRequest();
    //this.signalRService.connectChat();
  }

  /*private startHttpRequest = () => {
    this.http.get(`{https://localhost:7168/chat}`)
      .subscribe(res => {
        console.log(res);
      })
  }*/

  send(){
    /*console.log(this.messagesList);
    console.log(this.form.value['text'] as string);
    this.signalRService.sendMessage({
      text: this.form.value['text'] as string,
      name: 'test'
    });*/
  }
}
