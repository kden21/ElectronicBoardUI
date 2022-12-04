import {Component, Input, OnInit} from '@angular/core';
import {IAdvt} from "../../models/advt";
import {Status} from "../../models/filters/advtFilter";
import {AdvtService} from "../../services/advt.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-advt-favorite-list',
  templateUrl: './advt-favorite-list.component.html',
  styleUrls: ['./advt-favorite-list.component.css']
})
export class AdvtFavoriteListComponent implements OnInit {

  advtList:IAdvt[]=[];
  userId:number;
  private subscription: Subscription;
  constructor(private advtService:AdvtService,
              private route: ActivatedRoute,) {
    this.subscription = route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit(): void {
    this.getFavoriteAdvt();
  }

  getFavoriteAdvt() {
    this.advtService.getAllFilter({
      status: Status.Actual,
      userVoter: this.userId
    }).subscribe(res=>{
      this.advtList=res;
      console.log('избранные объявления')
    })
  }
}
