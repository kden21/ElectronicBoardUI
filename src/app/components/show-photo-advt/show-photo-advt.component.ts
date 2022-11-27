import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-show-photo-advt',
  templateUrl: './show-photo-advt.component.html',
  styleUrls: ['./show-photo-advt.component.css']
})
export class ShowPhotoAdvtComponent implements OnInit {


  constructor() { }
  @Output() showPhoto = new EventEmitter<boolean>();
  @Input() photo:string;


  ngOnInit(): void {
  }

  showElement(showElement: boolean){
    this.showPhoto.emit(showElement)
  }

}
