import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IUser} from "../../models/user";
import {Observable} from "rxjs";
import {ILoginResponse} from "../../models/loginResponse";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userId: number;
  resp:ILoginResponse
  @Input() user: IUser

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!);
  }

}
