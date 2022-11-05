import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAdvt} from "../../models/advt";

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent implements OnInit {

  @Output() writeReview = new EventEmitter<boolean>();

  constructor() { }

  showWriteReview(showElement:boolean){
    this.writeReview.emit(showElement)
  }

  ngOnInit(): void {
  }

}
