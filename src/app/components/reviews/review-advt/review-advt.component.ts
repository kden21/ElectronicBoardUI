import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {IUser} from "../../../models/user";
import {IAdvtReview} from "../../../models/review/advtReview";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-review-advt',
  templateUrl: './review-advt.component.html',
  styleUrls: ['./review-advt.component.css']
})
export class ReviewAdvtComponent implements OnInit {

  @Input() advtReview: IAdvtReview
  user: IUser

  constructor(private advtService: UserService) {
  }

  ngOnInit(): void {

    this.advtService.getById(this.advtReview.authorId).subscribe(user => this.user = user);
  }

  onNavigateToUser(userId:number){
    window.open(`${environment.angularUrl}/users/${userId}`);
  }

}

