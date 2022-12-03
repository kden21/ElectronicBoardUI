import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {IUser} from "../../models/user";
import {UserService} from "../../services/user.service";
import {BehaviorSubject} from "rxjs";
import {StatusUser} from "../../models/filters/userFilter";
import {UserReviewService} from "../../services/review/userReview.service";

@Component({
  selector: 'app-colllection-users',
  templateUrl: './colllection-users.component.html',
  styleUrls: ['./colllection-users.component.css']
})
export class ColllectionUsersComponent implements OnInit {

  userList: BehaviorSubject<IUser[]>=new BehaviorSubject<IUser[]>([]);
  @Input() status = new EventEmitter<number>();
  isLoadingData$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  ratingUser: BehaviorSubject<number>=new BehaviorSubject<number>(0);

  constructor(
    private userService: UserService,
    private userReviewService:UserReviewService) { }

  ngOnInit(): void {
    this.getUsersByStatus(StatusUser.Actual);
  }

  getUsersByStatus(statusUser:StatusUser){
    this.userService.getAllFilter({
      status:statusUser
    }).subscribe(userList =>{
        this.userList.next(userList);
        this.isLoadingData$.next(true);
      }
    )
  }

  con(userId?:number){
    return 5
    /*let rating:number=0;
    if(userId!==null) {
      console.log('if')
      this.userReviewService.getAll(userId!).subscribe(res => {
          res.forEach((review) => {
            rating = +review.rating;
          })
          rating = Math.floor(rating / res.length);
        }

      ).unsubscribe()
      console.log('2+++'+rating)
    }
    console.log('r'+rating)

      return rating;*/
  }
}
