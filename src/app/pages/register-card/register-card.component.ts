import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IAccount} from "../../models/account";
import {UserService} from "../../services/user.service";
import {IUser, StatusRole} from "../../models/user";
import {StatusUser} from "../../models/filters/userFilter";
import {getLocaleDateFormat} from "@angular/common";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'register',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {

   account: IAccount;
   isCreateAccount:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(true);

  constructor(
    private  authService:AuthService,
    private userService:UserService) { }

  form = new FormGroup({
    login: new FormControl<string>("",[Validators.required, Validators.maxLength(20),
      Validators.pattern('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$')]),
    password: new FormControl<string>("",[Validators.required, Validators.maxLength(20)]),
    phone: new FormControl<string>("",[Validators.required, Validators.maxLength(20),
      Validators.pattern('^(\\s*)?(\\+)?([- _():=+]?\\d[- _():=+]?){10,14}(\\s*)?$')]),
    passwordConfirm:new FormControl<string>("",[Validators.required, Validators.maxLength(20)]),
    name:new FormControl<string>("",[Validators.required, Validators.maxLength(20)]),
    lastName:new FormControl<string>("",[Validators.required, Validators.maxLength(20)]),
    birthday:new FormControl<string>("",)
  })

  ngOnInit(): void {
  }

  createUser(){
    this.isCreateAccount.next(!(this.isCreateAccount.value))
  }

  submit(){
    if(this.form.invalid){
      alert("форма невалидна");
      Object.values(this.form.controls).forEach(control=>{
        if(control.invalid){
          control.markAllAsTouched();
          control.updateValueAndValidity({onlySelf:true});
        }
      })
      return;
    }
    else
    {
      this.authService.register(
        {
          login: this.form.value['login'] as string,
          password: this.form.value['password'] as string,
          accountId: 0,
          birthday: this.form.value['birthday'] as string,
          email: this.form.value['login'] as string,
          lastName: this.form.value['lastName'] as string,
          phoneNumber: this.form.value['phone'] as string,
          photo: "",
          role:StatusRole.User,
          statusUser: StatusUser.Actual,
          name:this.form.value['name'] as string
        }).subscribe(res => {
          this.authService.login({
            login: this.form.value['login'] as string,
            password: this.form.value['password'] as string
          })
      });






    }
  }
}
