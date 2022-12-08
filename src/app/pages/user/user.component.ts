import {Component, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {IUser} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {IAdvt} from "../../models/advt";
import {AdvtService} from "../../services/advt.service";
import {AdvtFilter} from "../../models/filters/advtFilter";
import {IUserReview} from "../../models/review/userReview";
import {UserReviewService} from "../../services/review/userReview.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userRating: number = 0;
  viewingUser: IUser;
  showAdvtList$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  advtFilter: AdvtFilter = new AdvtFilter();

  @Input() user: IUser;
  @Output() userId: number;
  @Output() userReviews: IUserReview[];
  @Output() adList: IAdvt[];
  isLoadAdvts$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadUserReviews$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private advtService: AdvtService,
    private userReviewService: UserReviewService,
    private userService: UserService) {
    this.subscription = route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit(): void {
    this.advtFilter.userId = this.userId;
    this.advtFilter.status = 0;

    this.userService.getById(this.userId).subscribe(res => {
      this.user = res;
      this.isLoadUser$.next(true)
    });

    this.getAdvts(this.advtFilter);

    this.userReviewService.getAll(this.userId).subscribe(res => {
      this.userReviews = res;
      if (res.length != 0) {
        res.forEach((item) => {
          this.userRating = this.userRating + item.rating
        })
        this.userRating = Math.floor(this.userRating / res.length);
        this.isLoadUserReviews$.next(true);
      }

    })
  }

  getStatusAdvt(status: number) {
    this.advtFilter.status = status;
    this.getAdvts(this.advtFilter)
  }

  getAdvts(advtFilter: AdvtFilter) {
    this.advtService.getAllFilter(advtFilter).subscribe(advtList => {
      if ((advtList.length === 0) && (advtFilter.status == 0)) {
        console.log('daaaaaa')
        this.advtService.getAllFilter({
          status: 1,
          userId: this.userId
        }).subscribe(res => {
          if (res.length == 0) {
            this.isLoadAdvts$.next(false);
          } else {
            this.isLoadAdvts$.next(true);
            this.adList = [];
            this.showAdvtList$.next(false);
          }
        })
      } else {
        if (advtList.length == 0) {
          this.adList = [];
          this.showAdvtList$.next(false);
        } else {
          this.adList = advtList;
          this.showAdvtList$.next(true);
          this.isLoadAdvts$.next(true);
        }
      }
    });
  }
}
