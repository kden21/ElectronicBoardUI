import {Component, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {UserReviewService} from "../../services/review/userReview.service";

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
  userRating:number=0;

  isLoadUser$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private userReviewService:UserReviewService) {
  }

  ngOnInit(): void {
    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
      this.userReviewService.getAll(this.user.id!).subscribe(res=>{
        if(res.length!=0){
          res.forEach((item)=>
            this.userRating=this.userRating+item.rating
          )
          this.userRating=Math.floor(this.userRating/res.length);
        }
        this.isLoadUser$.next(true);
      })
    });
    this.viewingUser = this.userService.getViewUser();
  }
}
