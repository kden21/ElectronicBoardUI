import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailSendlerService} from "../../services/email-sendler.service";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  emailIsConfirm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  passwordChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errorText: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  passwordConfirm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  accountId: number;

  constructor(private emailSendlerService: EmailSendlerService,
              private authService: AuthService) {
  }

  form = new FormGroup<any>({
    login: new FormControl<string>("", [Validators.required, Validators.maxLength(40),
      Validators.pattern('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$')]),
    emailConfirmCode: new FormControl<number>(parseInt(""), [Validators.required, Validators.maxLength(4)]),
    name: new FormControl<string>("", [Validators.required, Validators.maxLength(40)]),
    password: new FormControl<string>("", [Validators.required, Validators.maxLength(20),
      Validators.minLength(6)]),
    passwordConfirm: new FormControl<string>("", [Validators.required, Validators.minLength(6)])
  })

  ngOnInit(): void {
  }

  emailSendMessage() {
    this.emailSendlerService.passwordRecovery({
      receiverMail: this.form.value['login'] as string,
      receiverName: this.form.value['name'] as string,
    })
      .subscribe(res => {
        this.emailIsConfirm.next(false),
          this.accountId = res;
      })
  }

  confirmEmail() {
    this.emailSendlerService.confirmEmail(this.accountId, this.form.value['emailConfirmCode'] as number)
      .subscribe(res => {
        this.passwordChange.next(true)
      })
  }

  saveChanges() {
    this.emailSendlerService.passwordChange({
      id: this.accountId,
      login: this.form.value['login'] as string,
      password: this.form.value['password'] as string
    }).subscribe(res => {
      console.log('Сменили пароль')
      this.authService.login({
        id: this.accountId,
        login: this.form.value['login'] as string,
        password: this.form.value['password'] as string
      })
    })
  }

  confirmPassword() {
    if ((this.form.value['password'] as string) == (this.form.value['passwordConfirm'] as string)) {
      this.passwordConfirm.next(true)
    } else {
      this.passwordConfirm.next(false)
    }
  }
}
