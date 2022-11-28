import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {Status} from "../../models/filters/advtFilter";
import {AdvtService} from "../../services/advt.service";
import {AuthService} from "../../services/auth.service";
import {IUserReview} from "../../models/review/userReview";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  writeReview: boolean = false;
  writeReport: boolean = false;
  editProfile: boolean = false;
  deleteProfile: boolean = false;
  showDeleteProfile: boolean = false;
  @Input() userRating:number;

  viewingUser: IUser;

  @Input() user: IUser;
  @Input() userId: number;
  @Output() userIdReview: number;
  //@Input() userReviews:IUserReview[];
  userBlocked:boolean = false;

  isUserLoading$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isUserDeleted$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  private routeSub: Subscription;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authService:AuthService,
              private  router:Router
  ) {
  }

  /*getRating(){
    this.userReviews.forEach((item)=>{
      console.log(item.rating+' item р')
      this.userRating=this.userRating+item.rating
    })
    console.log(this.userRating+' итог')
  }*/

  showWriteReview(showElement: boolean) {
    this.writeReview = showElement;
  }

  showWriteReport(showElement: boolean) {
    this.writeReport = showElement;
  }

  editProfileData(showElement: boolean) {
    this.editProfile = showElement;
  }
  showDelete(showElement: boolean) {
    this.showDeleteProfile = showElement;
  }
  deleteUserProfile(showElement: boolean) {
    this.deleteProfile = showElement;
    this.deleteUser(this.user.id!);
    this.router.navigateByUrl('/users/'+this.user.id)
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    if (this.user == null) {
      this.routeSub = this.route.params.subscribe(params => {
        this.userId = parseInt(params['id']);
      });
    }
    else{
      this.userId=this.user.id!
    }

    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
      this.isUserLoading$.next(true);
    });

    this.userIdReview = this.userId;

    this.viewingUser = this.userService.getViewUser();
  }

  deleteUser(userId:number){
    this.userService.deleteUser(userId, this.isUserDeleted$);
  }
}
