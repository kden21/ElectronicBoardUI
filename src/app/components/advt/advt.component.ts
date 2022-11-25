import {Component,OnInit, Output} from '@angular/core';
import {IAdvt} from "../../models/advt";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {AdvtService} from "../../services/advt.service";
import {IUser, StatusRole} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-advt',
  templateUrl: './advt.component.html',
  styleUrls: ['./advt.component.css']
})
export class AdvtComponent implements OnInit {

  private routeSub: Subscription;
  private id: number;
  editAdvt: boolean = false;
  writeReview: boolean = false;
  writeReport: boolean = false;
  createDateAdvt: string;

  advtShow: IAdvt;
  viewingUser: IUser;

  @Output() user: IUser;
  @Output() userOwnAdvtId: number;

  isLoadAdvt$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor(private route: ActivatedRoute, private advtService: AdvtService, private userService: UserService) {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = parseInt(params['id'])
    });
  }

  showEditAdvt(showElement: boolean) {
    showElement == true ? this.editAdvt = true : this.editAdvt = false;
  }

  showWriteReview(showElement: boolean) {
    showElement == true ? this.writeReview = true : this.writeReview = false;
  }

  showWriteReport(showElement: boolean) {
    showElement == true ? this.writeReport = true : this.writeReport = false;
  }


  ngOnInit(): void {
    this.advtService.getById(this.id).subscribe(advt => {
      this.advtShow = advt,
        this.userOwnAdvtId = advt.userId;
      this.isLoadAdvt$.next(true);
    });
    this.viewingUser = this.userService.getViewUser();


  }

  deleteAdvt(advtId:number){
    this.advtService.deleteAdvt(advtId).subscribe(c=>console.log("deleteADVT"));
  }

  ngOnDestroy() {
  }
}
