import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryReportService} from "../../../services/reports/category-report.service";
import {ICategoryReport} from "../../../models/reports/categoryReport";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserReportService} from "../../../services/reports/user-report.service";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../models/user";
import {delay, Subscription, timeout} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AdvtService} from "../../../services/advt.service";

@Component({
  selector: 'app-write-report-profile',
  templateUrl: './write-report-profile.component.html',
  styleUrls: ['./write-report-profile.component.css']
})
export class WriteReportProfileComponent implements OnInit {
  private subscription: Subscription;
  userReportId:number;
  authorReportId:number;
  isUploaded=false;
  load=false;
  @Output() writeReport = new EventEmitter<boolean>();
  categories:ICategoryReport[];
  selectedCat:ICategoryReport=new class implements ICategoryReport {
    id: number=0;
    name: string="Выберите категорию"
  }

  constructor(
    private route: ActivatedRoute,
    private categoryReportService:CategoryReportService,
    private userReportService:UserReportService,
  ) { this.subscription = route.params.subscribe(params => this.userReportId = params['id']); }
  form = new FormGroup({
    description: new FormControl<string>("")
  })

  showWriteReport(showElement: boolean){
    this.writeReport.emit(showElement)
  }

  submit(){
    this.load=true;
    this.userReportService.createUserReport({
      description: this.form.value['description'] as string,
      authorId: this.authorReportId,
      userId: this.userReportId,
      categoryReportId:this.selectedCat.id,
    }).subscribe(res=> {
      this.isUploaded=true;//showWriteReport(true)
    } )
  }

  ngOnInit(): void {
    this.categoryReportService.getAll().subscribe(categories=>this.categories=categories);
    console.log(this.userReportId+"_aaaaaaaa");
    this.authorReportId=JSON.parse(localStorage.getItem('user')!).id
    console.log(this.authorReportId+"_addddd");
  }

}
