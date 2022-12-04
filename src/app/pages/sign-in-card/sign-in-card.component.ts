import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-in-card',
  templateUrl: './sign-in-card.component.html',
  styleUrls: ['./sign-in-card.component.css']
})
export class SignInCardComponent implements OnInit {


  constructor(private  authService:AuthService) { }

  form = new FormGroup({
    login: new FormControl<string>(""),
    password: new FormControl<string>("")
  })

  ngOnInit(): void {
  }

  submit(){
    this.authService.login({
      login: this.form.value['login'] as string,
      password: this.form.value['password'] as string
    })
  }
}
