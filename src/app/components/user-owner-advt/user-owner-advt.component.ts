import {Component, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
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

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }


  ngOnInit(): void {
    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
      console.log(this.userId)
    });

    this.viewingUser = this.userService.getViewUser();
  }

}
