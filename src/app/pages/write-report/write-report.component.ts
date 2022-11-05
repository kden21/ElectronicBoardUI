import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-write-report',
  templateUrl: './write-report.component.html',
  styleUrls: ['./write-report.component.css']
})
export class WriteReportComponent implements OnInit {

  @Output() writeReport = new EventEmitter<boolean>();

  constructor() { }

  showWriteReport(showElement: boolean){
    this.writeReport.emit(showElement)
  }

  ngOnInit(): void {
  }

}
