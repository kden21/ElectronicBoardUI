import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../models/user";
import {UserService} from "../../services/user.service";
import {IAdvt} from "../../models/advt";
import {AdvtService} from "../../services/advt.service";
import {IAdvtReport} from "../../models/reports/advtReport";
import {BehaviorSubject} from "rxjs";
import {AdvtReportService} from "../../services/reports/advt-report.service";
import {StatusAdvtReport} from "../../models/filters/reports/adReportFilter";

@Component({
  selector: 'app-advt-report-card',
  templateUrl: './advt-report-card.component.html',
  styleUrls: ['./advt-report-card.component.css']
})
export class AdvtReportCardComponent implements OnInit {

  @Input() advtReport:IAdvtReport;
  advt: IAdvt;
  author: IUser;
  isLoadAdvt$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isLoadAuthor$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isArchiveReport$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor(
    private advtService:AdvtService,
    private userService:UserService,
    private advtReportService:AdvtReportService
  ) { }

  ngOnInit(): void {
    this.advtService.getById(this.advtReport.advtId).subscribe(advt=> {
      this.advt = advt;
      this.isLoadAdvt$.next(true)
    });
    this.userService.getById(this.advtReport.authorId).subscribe(author=> {
      this.author = author;
      this.isLoadAuthor$.next(true)
    });
  }

  archived(advtReport:IAdvtReport){
    this.isArchiveReport$.next(true);
    advtReport.statusCheck=StatusAdvtReport.Archive;
    this.advtReportService.updateAdvtReport(advtReport).subscribe(res=> {
      ;
    });
  }
}


