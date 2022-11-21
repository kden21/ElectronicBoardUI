import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {IAdvtReport} from "../../models/reports/advtReport";
import {AdvtReportService} from "../../services/reports/advt-report.service";
import {BehaviorSubject} from "rxjs";
import {StatusAdvtReport} from "../../models/filters/reports/adReportFilter";

@Component({
  selector: 'app-advt-reports',
  templateUrl: './advt-reports.component.html',
  styleUrls: ['./advt-reports.component.css']
})

export class AdvtReportsComponent implements OnInit {

  advtReports:IAdvtReport[]=[];
  constructor(private  advtReportService:AdvtReportService) { }
  statusAdvtReports:StatusAdvtReport=0;
  @Input() status = new EventEmitter<number>();
  isLoading$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.getReportsByStatus(StatusAdvtReport.Actual);
  }

  checkStatusReport(status:StatusAdvtReport){
    this.statusAdvtReports=status;
    this.getReportsByStatus(this.statusAdvtReports);
  }

  getReportsByStatus(statusCheck:number){
    this.advtReportService.getAll({
      status:statusCheck
    }).subscribe(advtReports=> {
      this.advtReports = advtReports;
      this.isLoading$.next(true)
      console.log(statusCheck+"статус ")
    });

  }

}
