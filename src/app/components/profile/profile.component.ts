import {Component, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  writeReview: boolean = false;
  writeReport: boolean = false;
  editProfile: boolean = false;

  viewingUser: IUser;

  @Input() user: IUser;
  @Input() userId: number;
  @Output() userIdReview: number;

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  showWriteReview(showElement: boolean) {
    this.writeReview = showElement;
  }

  showWriteReport(showElement: boolean) {
    this.writeReport = showElement;
  }

  editProfileData(showElement: boolean) {
    this.editProfile = showElement;
  }

  ngOnInit(): void {
    if (this.userId == null) {
      this.routeSub = this.route.params.subscribe(params => {
        this.userId = parseInt(params['id']);
      });
    }

    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
    });

    this.userIdReview = this.userId;

    this.viewingUser = this.userService.getViewUser();
  }

}
