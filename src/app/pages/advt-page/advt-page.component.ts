import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-advt-page',
  templateUrl: './advt-page.component.html',
  styleUrls: ['./advt-page.component.css']
})
export class AdvtPageComponent implements OnInit {
  public  advt: any;
  public id: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.http.get('https://localhost:7097/v1/advts/21').subscribe(
      {
        next:(data:any) => this.advt=data
      });
  }
  setData(){
    const data={
      "id": 0,
      "name": "Тимур",
      "price": 0,
      "description": "string",
      "photo": null,
      "status": 0,
      "categoryId": 1,
      "userId": 8,
      "createDate": "2022-10-31T17:58:13.799Z"}

    this.http.post('https://localhost:7097/v1/advts', data).subscribe(
      {
        next:(data:any) => this.id=data
      });
  }
}
