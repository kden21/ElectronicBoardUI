import { Component, OnInit } from '@angular/core';
import {animate, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.css'],
  animations:  [
    trigger('triggerName', [
      transition('initialState => finalState', [
        animate('1500ms ease-in')
      ])
    ])
  ],
})
export class ErrorNotificationComponent implements OnInit {

  textNotification:string;
  constructor() { }

  ngOnInit(): void {
  }

}
