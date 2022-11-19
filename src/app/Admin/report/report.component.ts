import {Component, Input, OnInit} from '@angular/core';
import {IUserReport} from "../../models/reports/userReport";
import {IUser} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @Input() userReport:IUserReport;
  user: IUser;
  author: IUser;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getById(this.userReport.userId).subscribe(user=>this.user=user);
    this.userService.getById(this.userReport.authorId).subscribe(author=>this.author=author);
  }

}
