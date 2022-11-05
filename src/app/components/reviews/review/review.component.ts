import {Component, Input, OnInit} from '@angular/core';
import {IUserReview} from "../../../models/review";
import {UserService} from "../../../services/user.service";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() userReview: IUserReview
  user: IUser

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getById(this.userReview.authorId).subscribe(user => this.user = user);
  }

}
