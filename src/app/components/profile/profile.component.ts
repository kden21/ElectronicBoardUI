import {Component, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {Status} from "../../models/filters/advtFilter";
import {AdvtService} from "../../services/advt.service";

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

  viewingUser: IUser;

  @Input() user: IUser;
  @Input() userId: number;
  @Output() userIdReview: number;

  isUserLoading$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isUserDeleted$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  private routeSub: Subscription;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private advtService:AdvtService,
              private  router:Router
  ) {
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
  showDelete(showElement: boolean) {
    this.showDeleteProfile = showElement;
  }
  deleteUserProfile(showElement: boolean) {
    this.deleteProfile = showElement;
    this.deleteUser(this.user.id!);
    console.log('пользователь удален')
    //this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    if (this.user == null) {

      this.routeSub = this.route.params.subscribe(params => {
        this.userId = parseInt(params['id']);
        console.log('Параметры'+this.userId)
      });
    }
    else{
      this.userId=this.user.id!
      console.log(this.userId+' userId')
    }

    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
      console.log(user+' user')
      this.isUserLoading$.next(true);
      console.log('aaaaaaaa')
    });

    this.userIdReview = this.userId;

    this.viewingUser = this.userService.getViewUser();
  }

  //todo: доделать logout
  deleteUser(userId:number){
    this.userService.deleteUser(userId, this.isUserDeleted$);
  }
}
