import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAdvt} from "../../models/advt";

@Component({
  selector: 'app-edit-advt',
  templateUrl: './edit-advt.component.html',
  styleUrls: ['./edit-advt.component.css']
})
export class EditAdvtComponent implements OnInit {
  @Input() advt: IAdvt;
  @Output() editAdvt = new EventEmitter<boolean>();

  constructor() { }

  showEditAdvt(showEditAdvt:boolean){
    this.editAdvt.emit(showEditAdvt)
  }

  ngOnInit(): void {
  }

}
