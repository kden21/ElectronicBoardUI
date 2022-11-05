import {Component, Input, OnInit} from '@angular/core';
import {UserReviewService} from "../../../services/review/userReview.service";
import {IUserReview} from "../../../models/review";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-reviews-profile',
  templateUrl: './reviews-profile.component.html',
  styleUrls: ['./reviews-profile.component.css']
})
export class ReviewsProfileComponent implements OnInit {

  @Input() userIdReview: number;
  userReviews: IUserReview[]|null = null;

  constructor(private userReviewsService: UserReviewService) {
  }

  ngOnInit(): void {

    this.userReviewsService.getAll(this.userIdReview).subscribe(userReviews => {
      if (userReviews.length != 0)
        this.userReviews = userReviews;

      }
     /* if(typeof this.userReviews=='undefined'){
        this.userReviews=null;
      }
      else {
      this.userReviews=userReviews}
      }*/
    );
  }

}
