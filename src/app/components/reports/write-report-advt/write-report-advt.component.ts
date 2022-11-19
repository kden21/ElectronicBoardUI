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
import { AdvtReportService } from 'src/app/services/reports/advt-report.service';

@Component({
  selector: 'app-write-report-advt',
  templateUrl: './write-report-advt.component.html',
  styleUrls: ['./write-report-advt.component.css']
})
export class WriteReportAdvtComponent implements OnInit {
  private subscription: Subscription;
  advtReportId:number;
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
    private advtReportService:AdvtReportService,
  ) { this.subscription = route.params.subscribe(params => this.advtReportId = params['id']); }
  form = new FormGroup({
    description: new FormControl<string>("")
  })

  showWriteReport(showElement: boolean){
    this.writeReport.emit(showElement)
  }

  submit(){
    this.load=true;
    this.advtReportService.createAdvtReport({
      description: this.form.value['description'] as string,
      authorId: this.authorReportId,
      advtId: this.advtReportId,
      categoryReportId:this.selectedCat.id,
    }).subscribe(res=> {
      this.isUploaded=true;//showWriteReport(true)
    } )
  }

  ngOnInit(): void {
    this.categoryReportService.getAll().subscribe(categories=>this.categories=categories);
    this.authorReportId=JSON.parse(localStorage.getItem('user')!).id
  }

}
