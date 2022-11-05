import {Component, Input, OnInit} from '@angular/core';
import {IAdvt} from "../../models/advt";
import {IUser} from "../../models/user";
import {AdvtService} from "../../services/advt.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-colllection-users',
  templateUrl: './colllection-users.component.html',
  styleUrls: ['./colllection-users.component.css']
})
export class ColllectionUsersComponent implements OnInit {

  @Input() userList: IUser[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(userList =>{
        this.userList=userList
      }
    )
  }

}
