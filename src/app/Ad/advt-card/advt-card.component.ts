import {Component, Input, OnInit} from '@angular/core';
import {IAdvt} from "../../models/advt";
import {AdvtService} from "../../services/advt.service";

@Component({
  selector: 'app-advt-card',
  templateUrl: './advt-card.component.html',
  styleUrls: ['./advt-card.component.css']
})
export class AdvtCardComponent implements OnInit {

  @Input() advtList: IAdvt[]|null;

  constructor(private advtService: AdvtService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
