import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
  errorText:BehaviorSubject<string|null>=new  BehaviorSubject<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private advtReviewService:AdvtReviewService,
  ) { this.subscription = route.params.subscribe(params => this.advtReviewId = params['id']); }
  form = new FormGroup({
    description: new FormControl<string>("",[Validators.required]),
  })

  submit(){
    this.errorText.next(null);
    if(this.form.invalid||this.rating==0){
      this.errorText.next("Заполните все поля");
      return;
    }
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
