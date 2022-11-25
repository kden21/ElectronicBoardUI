import {Component, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-owner-advt',
  templateUrl: './user-owner-advt.component.html',
  styleUrls: ['./user-owner-advt.component.css']
})
export class UserOwnerAdvtComponent implements OnInit {

  viewingUser: IUser;

  user: IUser;
  @Input() userId: number;
  @Output() userIdReview: number;

  isLoadUser$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    //this.subscription = route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit(): void {
    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
      this.isLoadUser$.next(true);
    });
    this.viewingUser = this.userService.getViewUser();
  }

}
