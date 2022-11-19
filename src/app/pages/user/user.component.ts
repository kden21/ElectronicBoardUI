import {Component, Input, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {IUser} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {IAdvt} from "../../models/advt";
import {AdvtService} from "../../services/advt.service";
import {AdvtFilter, Status} from "../../models/filters/advtFilter";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private routeSub: Subscription;

  viewingUser: IUser;
  showAdvtList: boolean = true;
  advtFilter: AdvtFilter = new AdvtFilter();

  @Input() user: IUser;
  @Input() userIdReviews: number;
  @Output() userId: number;
  @Output() adList: IAdvt[];

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private advtService: AdvtService) {
    this.subscription = route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit(): void {

    this.advtFilter.userId = this.userId;
    this.advtFilter.status = 0;

    this.getAdvts(this.advtFilter);

  }
  getStatusAdvt(status:number) {
    this.advtFilter.status= status;
    this.getAdvts(this.advtFilter)

  }
  getAdvts(advtFilter:AdvtFilter){
    this.advtService.getAllFilter(advtFilter).subscribe(advtList => {

      if (advtList === undefined)
        this.showAdvtList = false
      else
        this.adList = advtList;
    });
  }
  ngOnDestroy() {
    //this.routeSub.unsubscribe();
  }

}
