import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {Status} from "../../models/filters/advtFilter";
import {AdvtService} from "../../services/advt.service";
import {AuthService} from "../../services/auth.service";
import {IUserReview} from "../../models/review/userReview";
import {UserReviewService} from "../../services/review/userReview.service";
import {HttpClient} from "@aspnet/signalr";
import {environment} from "../../../environments/environment";
import {ChatService} from "../../services/chat.service";

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
  @Input() userRating: number;

  viewingUser: IUser;

  @Input() user: IUser;
  userId: number;
  @Output() userIdReview: number;
  userBlocked: boolean = false;

  isUserLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUserDeleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showFavoriteAdvts$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private routeSub: Subscription;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private userReviewService: UserReviewService,
              private chatService: ChatService
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = parseInt(params['id'])
    })
  }

  getRating() {
    let rating: number = 0;
    this.userReviewService.getAll(this.user.id!).subscribe(res => {
        res.forEach((review) => {
          rating = rating + review.rating;
        })
        this.userRating = Math.floor(rating / res.length);
      }
    )
  }

  showWriteReview(showElement: boolean) {
    this.writeReview = showElement;
  }

  showFavorite() {
    this.showFavoriteAdvts$.next(true);
  }

  showWriteReport(showElement: boolean) {
    this.writeReport = showElement;
  }

  editProfileData(showElement: boolean) {
    this.editProfile = showElement;
    this.userService.getById(this.user.id!).subscribe(res => {
      this.user = res
      this.authService.userLogin$.next(this.user)
    });

  }

  showDelete(showElement: boolean) {
    this.showDeleteProfile = showElement;
  }

  deleteUserProfile(showElement: boolean) {
    this.deleteProfile = showElement;
    this.deleteUser(this.user.id!);
    this.router.navigateByUrl('/users/' + this.user.id)
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    if (this.user == null) {
      this.routeSub = this.route.params.subscribe(params => {
        this.userId = parseInt(params['id']);
      });
    } else {
      this.userId = this.user.id!
    }

    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
    });

    this.userIdReview = this.userId;
    if (this.userRating === undefined) {
      this.getRating();
    }
    this.viewingUser = this.userService.getViewUser();
    this.isUserLoading$.next(true);
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId, this.isUserDeleted$);
  }

  createConversation(isUserChat:boolean) {
    if(isUserChat){
      this.router.navigateByUrl(`/chat`)
    }
    else{
      let usersId:number[]=[];
      this.chatService.createConversation({
        usersId: usersId.concat(this.user.id!).concat(this.viewingUser.id!)
      }).subscribe(res=> {

        this.router.navigate(
          ['/chat'],
          {
            queryParams: {
              'id': res == 0 ? null : res,
            }
          }
        )
      })
    }
  }
}
