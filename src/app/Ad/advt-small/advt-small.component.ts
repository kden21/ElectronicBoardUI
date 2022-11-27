import {Component, Input, OnInit} from '@angular/core';
import {IAdvt} from "../../models/advt";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Subscription} from 'rxjs';
import {PhotoService} from "../../services/photo.service";

@Component({
  selector: 'app-advt-small',
  templateUrl: './advt-small.component.html',
  styleUrls: ['./advt-small.component.css']
})
export class AdvtSmallComponent implements OnInit {

  isPhotosLoading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  private subscription: Subscription;

  @Input() advt: IAdvt

  constructor(private photoService:PhotoService){
  }

  ngOnInit(): void {
    this.advt.photo=[]
    this.photoService.getAdvtPhotosFilter({
      advtId:this.advt.id
    }).subscribe(res=>
    {
      //this.advt.photo=[];
      if(res.length!=0){
        res.forEach((item)=>
          {
            this.advt.photo=this.advt.photo!.concat(item.base64Str);
          }
        )
      }
      //if(this.advt.photo!.length!=0) {
        this.isPhotosLoading.next(true)
      //}
    })
  }



}
