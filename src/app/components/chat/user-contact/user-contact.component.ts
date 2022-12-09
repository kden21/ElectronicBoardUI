import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConversationModel} from "../../../models/chat/conversation-model";
import {UserService} from "../../../services/user.service";
import {PhotoService} from "../../../services/photo.service";
import {IUser} from "../../../models/user";
import {BehaviorSubject, Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.css']
})
export class UserContactComponent implements OnInit {

  @Output() userMemberName = new EventEmitter<string>();
  @Input() conversation: ConversationModel;
  memberChat: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null)
  private subscription: Subscription;
  selectedChatId: number;

  getUserMemberName(showElement:string){
    this.userMemberName.emit(showElement)
  }

  constructor(private userService: UserService,
              private route: ActivatedRoute,) {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.selectedChatId = parseInt(queryParam['id']);
      });
  }

  ngOnInit(): void {
    this.userService.getById(this.conversation.conversationMembers![0].userId!).subscribe(res => {
      this.memberChat.next(res);
    });
  }

}
