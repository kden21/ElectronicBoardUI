import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {IAccount} from "../../models/account";

@Component({
  selector: 'register',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {

  @Input() account: IAccount;
  constructor(private  authService:AuthService) { }

  form = new FormGroup({
    login: new FormControl<string>(""),
    password: new FormControl<string>("")
  })

  ngOnInit(): void {
  }

  submit(){
    this.authService.register(
      {
        id:0,
      login: this.form.value['login'] as string,
      password: this.form.value['password'] as string
    }).subscribe(a => this.authService.login(
      {
      password:  this.form.value['password'] as string,
        login: this.form.value['login'] as string
      }
      ));
  }
}
