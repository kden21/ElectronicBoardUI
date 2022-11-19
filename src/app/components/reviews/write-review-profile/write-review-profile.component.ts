import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAdvt} from "../../../models/advt";
import {Subscription} from "rxjs";
import {ICategoryReport} from "../../../models/reports/categoryReport";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AdvtReviewService} from "../../../services/review/advtReview.service";
import {UserReviewService} from "../../../services/review/userReview.service";

@Component({
  selector: 'app-write-review-profile',
  templateUrl: './write-review-profile.component.html',
  styleUrls: ['./write-review-profile.component.css']
})
export class WriteReviewProfileComponent implements OnInit {

  private subscription: Subscription;
  userReviewId:number;
  authorReviewId:number;
  isUploaded=false;
  load=false;
  rating:number=0;
  @Output() writeReview = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private userReviewService:UserReviewService,
  ) { this.subscription = route.params.subscribe(params => this.userReviewId = params['id']); }
  form = new FormGroup({
    description: new FormControl<string>(""),
  })

  submit(){
    this.load=true;
    console.log("teat")
    this.userReviewService.createUserReview({
      description: this.form.value['description'] as string,
      authorId: this.authorReviewId,
      userId: this.userReviewId,
      rating: this.rating,
    }).subscribe(res=> {
      this.isUploaded=true;//showWriteReport(true)
    } )
  }

  showWriteReview(showElement:boolean){
    this.writeReview.emit(showElement)
  }

  ngOnInit(): void {
    this.authorReviewId=JSON.parse(localStorage.getItem('user')!).id
  }

}
