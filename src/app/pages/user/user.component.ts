import {Component, Input, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {IUser} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserReviewService} from "../../services/review/userReview.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private routeSub: Subscription;

  viewingUser: IUser;
  @Input() user: IUser;
  @Input() userIdReviews: number;
  @Output() userId: number;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute){
    this.subscription = route.params.subscribe(params=>this.userId=params['id']);
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    //this.routeSub.unsubscribe();
  }

}
