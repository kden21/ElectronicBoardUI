import { Component, OnInit, NgZone } from '@angular/core';
import {SignalrService} from "../../services/signalr.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageModel} from "../../models/chat/message-model";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagesList: BehaviorSubject<MessageModel[]>=new BehaviorSubject<MessageModel[]>([]);
  selectedConversationId:number;
  conversationIds:number[]=[];
  //userOwnerChat:IUser
  private subscription: Subscription;
  constructor(private signalRService:SignalrService,
              public zone: NgZone,
              private route: ActivatedRoute,
              public authService:AuthService
  )

  {
    this.subscription = route.params.subscribe(params => this.selectedConversationId = params['id']);
  }

  form = new FormGroup({
    text: new FormControl<string>(""),
  })

  ngOnInit() {
    this.signalRService.startConnection();


    this.signalRService.addChatListener();

    this.signalRService.addReceiveAllListener((messages: MessageModel[]) => this.messagesList.next(messages));

    //this.startHttpRequest();
    //this.signalRService.connectChat();
  }

  /*connectToChat(){
    this.signalRService.connectChat();
    console.log('мой коннект')
  }*/

  sendMessage(){
    console.log(this.messagesList);
    console.log(this.form.value['text'] as string);
    this.signalRService.sendMessage({
      conversationId: 0,
      createDate: "",
      description: "",
      userId: 0
    });
  }
}
