import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryReportService} from "../../../services/reports/category-report.service";
import {ICategoryReport} from "../../../models/reports/categoryReport";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserReportService} from "../../../services/reports/user-report.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {StatusUserReport} from "../../../models/filters/reports/userReportFilter";

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
  errorText:BehaviorSubject<string|null>=new  BehaviorSubject<string | null>(null);
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
    description: new FormControl<string>("",[Validators.required])
  })

  showWriteReport(showElement: boolean){
    this.writeReport.emit(showElement)
  }

  submit(){
    this.errorText.next(null);
    if(this.form.invalid||this.selectedCat.id==0){
      this.errorText.next("Заполните все поля");
      return;
    }
    this.load=true;
    this.userReportService.createUserReport({
      description: this.form.value['description'] as string,
      authorId: this.authorReportId,
      userId: this.userReportId,
      categoryReportId:this.selectedCat.id,
      statusCheck:StatusUserReport.Actual
    }).subscribe(res=> {
      this.isUploaded=true;//showWriteReport(true)
    } )
  }

  ngOnInit(): void {
    this.categoryReportService.getAll().subscribe(categories => this.categories = categories);
    this.authorReportId = JSON.parse(localStorage.getItem('user')!).id
  }
}
