import {Component, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdvtService} from "../../services/advt.service";
import {Status} from "../../models/filters/advtFilter";
import {IAdvt} from "../../models/advt";
import {HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-headerhome',
  templateUrl: './headerhome.component.html',
  styleUrls: ['./headerhome.component.css']
})
export class HeaderhomeComponent implements OnInit {
  user: IUser
  form = new FormGroup({
    description: new FormControl<string>(""),
  })
  constructor(private advtService:AdvtService,  private router: Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!);

  }
  submit(){
    let desc=this.form.value['description'] as string
    if(desc.toString().length!=0) {
      this.router.navigate(
        ['/'],
        {queryParams: {
          'search': desc
          }}
      );
    }
    //this.router.navigateByUrl(`/${params}`);
  }
}
