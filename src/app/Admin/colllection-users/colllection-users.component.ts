import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {IUser} from "../../models/user";
import {UserService} from "../../services/user.service";
import {BehaviorSubject} from "rxjs";
import {StatusUser} from "../../models/filters/userFilter";

@Component({
  selector: 'app-colllection-users',
  templateUrl: './colllection-users.component.html',
  styleUrls: ['./colllection-users.component.css']
})
export class ColllectionUsersComponent implements OnInit {

  userList: BehaviorSubject<IUser[]>=new BehaviorSubject<IUser[]>([]);
  @Input() status = new EventEmitter<number>();
  isLoadingData$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsersByStatus(StatusUser.Actual);
  }

  getUsersByStatus(statusUser:StatusUser){
    this.userService.getAllFilter({
      status:statusUser
    }).subscribe(userList =>{
        this.userList.next(userList);
        this.isLoadingData$.next(true);
      }
    )
  }
}
