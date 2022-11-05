import {Component, Input, OnInit} from '@angular/core';
import {IAdvt} from "../../models/advt";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-advt-small',
  templateUrl: './advt-small.component.html',
  styleUrls: ['./advt-small.component.css']
})
export class AdvtSmallComponent implements OnInit {
  id: number | number;
  private subscription: Subscription;

  @Input() advt: IAdvt

  constructor(private route: ActivatedRoute){
    this.subscription = route.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit(): void {
  }



}
