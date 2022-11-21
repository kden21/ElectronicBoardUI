import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Status} from "../../models/filters/advtFilter";
import {StatusUserReport} from "../../models/filters/reports/userReportFilter";

@Component({
  selector: 'app-element-active-archive',
  templateUrl: './element-active-archive.component.html',
  styleUrls: ['./element-active-archive.component.css']
})

export class ElementActiveArchiveComponent implements OnInit {

  @Input() value2: string;
  @Output() status = new EventEmitter<number>();
  statusCheck: number = 0


  @Output() statusUserReport = new EventEmitter<Status|StatusUserReport>();
  statusUserReportCheck: StatusUserReport = StatusUserReport.Actual

  constructor() {
  }

  getAdvtByStatus(status: Status) {
    this.status.emit(status);
    this.statusCheck = status;
  }

  // getUserReportByStatus(status: StatusUserReport) {
  //   this.statusAdvt.emit(status);
  //   this.statusAdvtCheck = status;
  // }

  ngOnInit(): void {
  }

}
