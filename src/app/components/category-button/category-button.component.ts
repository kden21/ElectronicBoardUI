import {Component, Input, OnInit, Output} from '@angular/core';
import {ICategory} from "../../models/category";

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.css']
})
export class CategoryButtonComponent implements OnInit {

  @Input() category:ICategory;
  @Output() toggle = false;

  constructor() { }

  ngOnInit(): void {
  }

}
