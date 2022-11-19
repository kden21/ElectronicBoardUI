import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IUser, StatusRole} from "../../models/user";
import {BehaviorSubject, Observable} from "rxjs";
import {ILoginResponse} from "../../models/loginResponse";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userId: number;
  resp:ILoginResponse
  user: IUser

  public isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  constructor(public authService: AuthService, private userService:UserService) {
  }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!);

    if(this.user!==null){
      this.userService.getById(this.user.id).subscribe(res=>{
        this.user=res;
        this.isLogin$.next(true);
        console.log(this.isLogin$+" loading")
        console.log(this.user.id+" user1id")
        console.log(this.user.name+" user1")
      })
    }
    console.log(this.isLogin$+" loading2")
    console.log(this.user.name+" user2")
    // this.authService.user$.subscribe(user=> {
    //   if(user===null)
    //     console.log("null")
    //   this.user = user
    // })
    // console.log(this.user+" 5")
  }

}
