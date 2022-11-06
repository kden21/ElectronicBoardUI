import {Component, Input, OnInit} from '@angular/core';
import {IUserReview} from "../../../models/review/userReview";
import {UserService} from "../../../services/user.service";
import {IUser} from "../../../models/user";
import {IAdvtReview} from "../../../models/review/advtReview";

@Component({
  selector: 'app-review-profile',
  templateUrl: './review-profile.component.html',
  styleUrls: ['./review-profile.component.css']
})
export class ReviewProfileComponent implements OnInit {

  @Input() userReview: IUserReview
  user: IUser

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {

      this.userService.getById(this.userReview.authorId).subscribe(user => this.user = user);


  }

}
