import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
  errorText:BehaviorSubject<string|null>=new  BehaviorSubject<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private userReviewService:UserReviewService,
  ) { this.subscription = route.params.subscribe(params => this.userReviewId = params['id']); }
  form = new FormGroup({
    description: new FormControl<string>("", [Validators.required]),
  })

  submit(){
    this.errorText.next(null);
    if(this.form.invalid||this.rating==0){
      this.errorText.next("Заполните все поля");
      return;
    }
    this.load=true;
    this.userReviewService.createUserReview({
      description: this.form.value['description'] as string,
      authorId: this.authorReviewId,
      userId: this.userReviewId,
      rating: this.rating,
    }).subscribe(res=> {
      this.isUploaded=true;
    } )
  }

  showWriteReview(showElement:boolean){
    this.writeReview.emit(showElement)
  }

  ngOnInit(): void {
    this.authorReviewId=JSON.parse(localStorage.getItem('user')!).id
  }

}
