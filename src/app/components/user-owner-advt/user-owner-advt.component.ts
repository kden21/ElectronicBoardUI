import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-user-owner-advt',
  templateUrl: './user-owner-advt.component.html',
  styleUrls: ['./user-owner-advt.component.css']
})
export class UserOwnerAdvtComponent implements OnInit {

  @Input() userId:number;
  user:IUser
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getById(this.userId).subscribe(user=>this.user=user);
  }

}
