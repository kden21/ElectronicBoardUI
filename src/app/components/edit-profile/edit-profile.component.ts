import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Output() editProfile = new EventEmitter<boolean>();

  @Input() user:IUser;

  base64Output : string;
  photo: string|null=null;
  photoUploaded:boolean = true;
  advtUploaded:boolean|null = null;
  clicked=false;

  constructor
  (
    private userService:UserService,
  )
  { }

  form = new FormGroup({
    name: new FormControl<string>("",[Validators.required,Validators.maxLength(20)]),
    lastName: new FormControl<string>("", [Validators.required,Validators.maxLength(20)]),
    email: new FormControl<string>("",[Validators.required,Validators.maxLength(40),
      Validators.pattern('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$')]),
    phone: new FormControl<string>("",[Validators.required,Validators.maxLength(11)]),
    middleName: new FormControl<string>("",[Validators.maxLength(20)]),
  })

  showEditProfile(showEditAdvt:boolean){
    this.editProfile.emit(showEditAdvt)
  }

  ngOnInit(): void {
  }

  submit(showEditAdvt:boolean){
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
    else {
      this.advtUploaded = false;
      if (this.photoUploaded == false) {
        console.log("Дождитесь загрузки фото")
        return;
      }

      this.clicked = true;
      this.userService.updateUser(this.user.id!,{
        //TODO:дата рождения пользователя
        birthday: '11112002',
        email: (this.form.value['email'] as string)==""? this.user.email:(this.form.value['email'] as string),
        lastName: (this.form.value['lastName'] as string)==""? this.user.email:(this.form.value['lastName'] as string),
        name: (this.form.value['name'] as string)===null? this.user.email:(this.form.value['name'] as string),
        phoneNumber: (this.form.value['phone'] as string)===null? this.user.email:(this.form.value['phone'] as string),
        photo: this.photo==null?this.user.photo:this.photo!,
        role: this.user.role,
        statusUser: this.user.statusUser,
        middleName:(this.form.value['middleName'] as string)===null? this.user.email:(this.form.value['middleName'] as string),
        accountId:this.user.accountId

      }).subscribe(res=> {
        this.editProfile.emit(showEditAdvt)
      })
    }
  }

  public onPhoto(event : any): void {
    const file = event.target.files[0];
    if (file == null){
      return;
    }

    this.photoUploaded = false;

    this.convertFile(file);
  }
  convertFile(file: File){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof(reader.result) == 'string') {
        this.photo = reader.result.toString();
        this.photoUploaded = true;
      }
    };
  }
}
