import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Output() deleteAction = new EventEmitter<boolean>();
  @Output() showDelete = new EventEmitter<boolean>();
  @Input() isActionEnd:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  constructor() { }

  delete(del:boolean){
    this.deleteAction.emit(del);
    this.showDelete.emit(del);
  }
  show(show:boolean){
    this.showDelete.emit(show);
  }
  ngOnInit(): void {
  }

}
