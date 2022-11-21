import {Component, Input, OnInit} from '@angular/core';
import {IUserReport} from "../../models/reports/userReport";
import {IUser} from "../../models/user";
import {UserService} from "../../services/user.service";
import {BehaviorSubject} from "rxjs";
import {StatusUserReport} from "../../models/filters/reports/userReportFilter";
import {UserReportService} from "../../services/reports/user-report.service";

@Component({
  selector: 'app-user-report-card',
  templateUrl: './user-report-card.component.html',
  styleUrls: ['./user-report-card.component.css']
})
export class UserReportCardComponent implements OnInit {

  @Input() userReport:IUserReport;
  user: IUser;
  author: IUser;
  isLoadUser$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isLoadAuthor$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isArchiveReport$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor(
    private userService:UserService,
    private userReportService:UserReportService
  ) { }

  ngOnInit(): void {
    this.userService.getById(this.userReport.userId).subscribe(user=> {
      this.user = user;
      this.isLoadUser$.next(true)
    });
    this.userService.getById(this.userReport.authorId).subscribe(author=> {
      this.author = author;
      this.isLoadAuthor$.next(true)
    });
  }

  archived(userReport:IUserReport){
    this.isArchiveReport$.next(true);
    userReport.statusCheck=StatusUserReport.Archive;
    this.userReportService.updateUserReport(userReport).subscribe(res=> {
      ;
    });

  }
}
