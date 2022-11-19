import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAdvt} from "../../../models/advt";
import {Subscription} from "rxjs";
import {ICategoryReport} from "../../../models/reports/categoryReport";
import {ActivatedRoute} from "@angular/router";
import {CategoryReportService} from "../../../services/reports/category-report.service";
import {UserReportService} from "../../../services/reports/user-report.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AdvtReviewService} from "../../../services/review/advtReview.service";

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent implements OnInit {

  private subscription: Subscription;
  advtReviewId:number;
  authorReviewId:number;
  isUploaded=false;
  load=false;
  rating:number=0;
  @Output() writeReview = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private advtReviewService:AdvtReviewService,
  ) { this.subscription = route.params.subscribe(params => this.advtReviewId = params['id']); }
  form = new FormGroup({
    description: new FormControl<string>(""),
  })

  submit(){
    this.load=true;
    this.advtReviewService.createAdvtReview({
      description: this.form.value['description'] as string,
      authorId: this.authorReviewId,
      advtId: this.advtReviewId,
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
