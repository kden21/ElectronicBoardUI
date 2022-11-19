import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
@Component({
  selector: 'app-result-notification',
  templateUrl: './result-notification.component.html',
  styleUrls: ['./result-notification.component.css'],
  animations:  [
    trigger('triggerName', [
      transition('initialState => finalState', [
        animate('1500ms ease-in')
      ])
    ])
  ],
})

export class ResultNotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
