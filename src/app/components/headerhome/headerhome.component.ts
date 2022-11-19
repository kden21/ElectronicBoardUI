import {Component, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdvtService} from "../../services/advt.service";
import {Status} from "../../models/filters/advtFilter";
import {IAdvt} from "../../models/advt";

@Component({
  selector: 'app-headerhome',
  templateUrl: './headerhome.component.html',
  styleUrls: ['./headerhome.component.css']
})
export class HeaderhomeComponent implements OnInit {
  user: IUser
  @Output() contain:string;
  form = new FormGroup({
    description: new FormControl<string>(""),
  })
  constructor(private advtService:AdvtService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!);
    this.contain= this.form.value['description'] as string;
  }
}
