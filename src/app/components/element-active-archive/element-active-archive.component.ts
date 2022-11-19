import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Status} from "../../models/filters/advtFilter";

@Component({
  selector: 'app-element-active-archive',
  templateUrl: './element-active-archive.component.html',
  styleUrls: ['./element-active-archive.component.css']
})

export class ElementActiveArchiveComponent implements OnInit {

  @Input() value2: string;
  @Output() status = new EventEmitter<Status>();
  statusCheck: Status = 0

  constructor() {
  }

  getAdvtByStatus(status: Status) {
    this.status.emit(status);
    this.statusCheck = status;
  }

  ngOnInit(): void {
  }

}
