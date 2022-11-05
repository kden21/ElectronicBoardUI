import {Component, Input, OnInit} from '@angular/core';
import {AdvtService} from "../../services/advt.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-advt-add-card',
  templateUrl: './advt-add-card.component.html',
  styleUrls: ['./advt-add-card.component.css']
})
export class AdvtAddCardComponent implements OnInit {

@Input() user: IUser
  constructor(private advtService: AdvtService) { }

  form = new FormGroup({
    name: new FormControl<string>("",[Validators.required, Validators.minLength(5)]),
    price: new FormControl<number>(parseInt("")),
    description: new FormControl<string>(""),
    status: new FormControl<number>(parseInt("")),
    location: new FormControl<string>(""),
  })

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!)
  }

  submit(){

    this.advtService.create({
      id: 0,
      name: this.form.value['name'] as string,
      price:  this.form.value['price'] as number,
      description: this.form.value['description'] as string,
      photo: "",
      statusAdvt: 0,
      location: this.form.value['location'] as string,
      categoryId: 1,
      userId: this.user.id
    }).subscribe( a => {console.log('a');})
  }
}
