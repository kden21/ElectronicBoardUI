import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IUser, StatusRole} from "../../models/user";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {ILoginResponse} from "../../models/loginResponse";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userId: number;
  resp:ILoginResponse
  user: IUser

  public isLogin$: BehaviorSubject<IUser|null> = new BehaviorSubject<IUser | null>(null);
  private routeSubscription: Subscription;
  private querySubscription: Subscription;

  constructor(public authService: AuthService, private userService:UserService,private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.user=JSON.parse(localStorage.getItem('user')!);
    // if(this.user!==null){
    //   this.userService.getById(this.user.id!).subscribe(res=>{
    //     this.user=res;
    //     this.isLogin$.next(this.user);
    //   })
    // }
  }

  search(){
    //this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        //this.product = queryParam['product'];
      }
    );
  }

}
