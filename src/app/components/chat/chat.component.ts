import {Component, OnInit, NgZone, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {SignalrService} from "../../services/signalr.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageModel} from "../../models/chat/message-model";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ChatService} from "../../services/chat.service";
import {ConversationModel} from "../../models/chat/conversation-model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scroll', {static: true}) scroll: any;
  @ViewChildren('messagesList') messagesListView: QueryList<any>;
  @ViewChildren('messagesSendList') messagesSendListView: QueryList<any>;

  messagesList: BehaviorSubject<MessageModel[]> = new BehaviorSubject<MessageModel[]>([]);

  selectedConversationId: number = 0;
  selectedConversation: BehaviorSubject<ConversationModel | null> = new BehaviorSubject<ConversationModel | null>(null)
  conversations: ConversationModel[] = [];

  userOwnerChat = this.authService.userLogin$.value;
  userMemberName: string;
  private subscription: Subscription;

  ngAfterViewInit() {
    this.messagesListView.changes.subscribe(t => {
      this.scrollChatToBottom();
    })
    this.messagesSendListView.changes.subscribe(t => {
      this.scrollChatToBottom();
    })
  }

  constructor(private signalRService: SignalrService,
              public zone: NgZone,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService,
              private chatService: ChatService,
              private userService: UserService,
  ) {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.selectedConversationId = parseInt(queryParam['id']);
      });

  }

  form = new FormGroup({
    text: new FormControl<string>("", [Validators.required]),
  })

  ngOnInit() {
    this.chatService.getConversations(this.userOwnerChat?.id!).subscribe(res => {
      this.conversations = res;
      res.forEach((item) => {
        if (item.id == this.selectedConversationId) {
          this.selectedConversation.next(item);
        }
      })
      if (!isNaN(this.selectedConversationId)) {
        this.selectConversation(this.selectedConversationId, true)
        this.userService.getById(this.selectedConversation.value!.conversationMembers![0].userId!).subscribe(res => {
          this.userMemberName = res.name + " " + res.lastName;
        });
      }
    })
  }

  getUserMemberName(showElement: string) {
    this.userMemberName = showElement;
  }

  scrollChatToBottom() {
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
  }

  sendMessage() {
    this.subscription.unsubscribe();
    if (this.form.get('text')?.invalid)
      return;

    this.signalRService.sendMessage({
      conversationId: this.selectedConversationId,
      description: this.form.value['text'] as string,
      userId: this.userOwnerChat?.id!
    });

    this.form.get('text')?.setValue('');
  }

  selectConversation(conversationId: number, first: boolean | null) {
    this.selectedConversationId = conversationId;

    this.conversations.forEach((item) => {
      if (item.id == this.selectedConversationId) {
        this.selectedConversation.next(item);
      }
    })

    console.log('зашли')
    if (first === null)
      this.signalRService.stopConnection();
    this.signalRService.startConnection(conversationId);

    this.signalRService.addReceiveListener((message: MessageModel) => {
      this.messagesList.next(this.messagesList.value.concat(message));
    });
    this.signalRService.addReceiveAllListener((messages: MessageModel[]) => {
      this.messagesList.next(messages);
    });

    this.router.navigate(
      [],
      {
        queryParams: {
          'id': conversationId
        }
      }
    )
  }
}
