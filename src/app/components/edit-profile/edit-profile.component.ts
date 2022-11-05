import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Output() editProfile = new EventEmitter<boolean>();

  constructor() { }

  showEditProfile(showEditAdvt:boolean){
    this.editProfile.emit(showEditAdvt)
  }

  ngOnInit(): void {
  }

}
