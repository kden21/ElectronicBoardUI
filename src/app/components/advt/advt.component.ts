import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IAdvt} from "../../models/advt";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {AdvtService} from "../../services/advt.service";
import {IUser, StatusRole} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AdvtFilter} from "../../models/filters/advtFilter";

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
  @Output() advtList: IAdvt[];

  constructor(private route: ActivatedRoute, private advtService: AdvtService, private userService: UserService) {

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
    this.routeSub = this.route.params.subscribe(params => {
      this.id = parseInt(params['id'])
    });

    this.advtService.getById(this.id).subscribe(advt => {
      this.advtShow = advt,
        this.userOwnAdvtId = advt.userId
      /*this.createDateAdvt=this.advtShow.createDate!.toString();
      this.advtShow.createDate=new Date(this.createDateAdvt);
      console.log(this.advtShow.createDate.toLocaleDateString())
      this.createDateAdvt=this.advtShow.createDate.toLocaleDateString();*/
    });
    this.viewingUser = this.userService.getViewUser();
    //const a:AdvtFilter=new class AdvtFilter
    this.advtList = this.advtService.getAllFilter(new AdvtFilter()).subscribe(advtList=>this.advtList=advtList)


  }


  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
