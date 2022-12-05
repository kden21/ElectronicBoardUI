import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IAccount} from "../../models/account";
import {StatusRole} from "../../models/user";
import {StatusUser} from "../../models/filters/userFilter";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environments/environment";
import {EmailSendlerService} from "../../services/email-sendler.service";

@Component({
  selector: 'register',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {
  siteKey: string;

  account: IAccount;
  isCreateAccount: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  passwordConfirm:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isEmailConfirm:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  errorText:BehaviorSubject<string|null>=new BehaviorSubject<string | null>(null);
 //timeForEmailConfirm:BehaviorSubject<number>=new BehaviorSubject<number>(45);

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private emailSendlerService:EmailSendlerService
  ) {
    this.siteKey = `${environment.siteKeyReCaptha}`;
  }

  form = new FormGroup({
    login: new FormControl<string>("", [Validators.required, Validators.maxLength(40),
      Validators.pattern('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$')]),
    password: new FormControl<string>("", [Validators.required, Validators.maxLength(20),
      Validators.minLength(6)]),
    phone: new FormControl<string>("", [Validators.required, Validators.maxLength(20),
      Validators.pattern('^(\\s*)?(\\+)?([- _():=+]?\\d[- _():=+]?){10,14}(\\s*)?$')]),
    passwordConfirm: new FormControl<string>("", [Validators.required, Validators.minLength(6)]),
    name: new FormControl<string>("", [Validators.required, Validators.maxLength(20)]),
    lastName: new FormControl<string>("", [Validators.required, Validators.maxLength(20)]),
    birthday: new FormControl<string>("", [Validators.required, Validators.maxLength(20)]),
    userCode: new FormControl<number>(parseInt(""),[Validators.required])
  })

  recaptchaForm: FormGroup;

  ngOnInit(): void {
    this.recaptchaForm = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  createUser() {
    this.errorText.next(null)
    if (this.recaptchaForm.invalid) {
      this.errorText.next("пройдите капчу");
      return;
    }
    this.isCreateAccount.next(!(this.isCreateAccount.value))
  }

  submit() {
    this.errorText.next(null);
    if (this.form.invalid) {
      this.errorText.next('Заполните все обязательные поля');
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAllAsTouched();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
      return;
    } else {
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
          role: StatusRole.User,
          statusUser: StatusUser.AwaitingEmailConfirm,
          name: this.form.value['name'] as string,
        }).subscribe(res => {
        this.isEmailConfirm.next(true);
        this.account=res;
      });
    }
  }

  confirmEmail(){
    this.emailSendlerService.confirmEmail(this.account.id!, this.form.value['userCode']! as number).subscribe(res=>{
      this.authService.login({
        login: this.form.value['login'] as string,
        password: this.form.value['password'] as string,
      });
    })
  }

  confirmPassword(){
    if((this.form.value['password'] as string)==(this.form.value['passwordConfirm'] as string)) {
      this.passwordConfirm.next(true)
    }
    else {
      this.passwordConfirm.next(false)
    }
  }
}

