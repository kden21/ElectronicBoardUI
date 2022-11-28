import {Component, Input, OnInit, Output} from '@angular/core';
import {AdvtReviewService} from "../../../services/review/advtReview.service";
import {IAdvtReview} from "../../../models/review/advtReview";

@Component({
  selector: 'app-reviews-advt',
  templateUrl: './reviews-advt.component.html',
  styleUrls: ['./reviews-advt.component.css']
})
export class ReviewsAdvtComponent implements OnInit {

  @Input() advtIdReview: number;
  advtReviews: IAdvtReview[] | null = null;

  constructor(private advtReviewService: AdvtReviewService) {
  }

  ngOnInit(): void {
    this.advtReviewService.getAll(this.advtIdReview).subscribe(advtReviews => {
        if (advtReviews.length != 0)
          this.advtReviews = advtReviews;
      }
    );
  }

}
