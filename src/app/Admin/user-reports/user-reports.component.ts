import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {UserReportService} from "../../services/reports/user-report.service";
import {IUserReport} from "../../models/reports/userReport";
import {StatusUserReport} from "../../models/filters/reports/userReportFilter";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css']
})
export class UserReportsComponent implements OnInit {

  userReports:IUserReport[]=[];
  statusUserReports:StatusUserReport=0;
  @Input() status = new EventEmitter<number>();
  isLoading$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor(private  userReportService:UserReportService) { }

  ngOnInit(): void {
    this.getReportsByStatus(StatusUserReport.Actual);
  }

  checkStatusReport(status:StatusUserReport){
    this.statusUserReports=status;
    console.log(status+' status')
    this.getReportsByStatus(this.statusUserReports);
  }

  getReportsByStatus(statusCheck:number){
      this.userReportService.getAll({
        status:statusCheck
      }).subscribe(userReports=> {
        this.userReports = userReports;
        this.isLoading$.next(true)
      });

  }

}
