import { Component, OnInit } from '@angular/core';
import {UserReportService} from "../../services/reports/user-report.service";
import {IUserReport} from "../../models/reports/userReport";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  userReports:IUserReport[]=[];
  constructor(private  userReportService:UserReportService) { }

  ngOnInit(): void {
    this.userReportService.getAll().subscribe(userReports=>this.userReports=userReports);
  }

}
