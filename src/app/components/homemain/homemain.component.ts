import {Component, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ICategory} from "../../models/category";
import {IAdvt} from "../../models/advt";
import {AdvtService} from "../../services/advt.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../models/filters/advtFilter";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-homemain',
  templateUrl: './homemain.component.html',
  styleUrls: ['./homemain.component.css']
})
export class HomemainComponent implements OnInit {

  //ss: boolean = new BehaviorSubject<boolean>(false)//IAdvt[]=[];
  @Output() advtList:IAdvt[]=[];
  @Output() valueTitle: string = "Актуальные объявления";

  lastAdvtId:number|null;
  countAdvt:number=4;
  advtListReset:boolean = false;
  isAdvtListExist:boolean=false;
  ss:boolean=false;

  //nextAdvtList:IAdvt[]=[];

  categories: ICategory[];
  subCategories: ICategory[];
  selectedCategory: ICategory = new class implements ICategory {
    id: number = 0;
    name: string = "Категория";
  }
  selectedSubCategory: ICategory = new class implements ICategory {
    id: number = 0;
    name: string = "Подкатегория";
  }

  form = new FormGroup({
    description: new FormControl<string>("",[Validators.required, Validators.minLength(5)]),
    location: new FormControl<string>(""),
    count: new FormControl<number>(parseInt("")),
    userId: new FormControl<number>(parseInt(""))
  })

  constructor(private categoryService: CategoryService, private advtService:AdvtService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });

 this.getFilterAdvtList()
  }

 getFilterAdvtList(){
    if(this.advtListReset==true){
      this.lastAdvtId=null;
      this.advtList=[];
      //this.nextAdvtList=[];
      this.ss=false;
      this.advtListReset=false
      //console.log('1+: '+ this.advtList.length+this.nextAdvtList.length)
    }
    this.advtService.getAllFilter({
      categoryId:this.selectedSubCategory.id,
      description:this.form.value['description'] as string,
      location:this.form.value['location'] as string,
      status: Status.Actual,
      count:this.countAdvt,
      lastAdvtId:this.lastAdvtId

    }).subscribe( advtList=> {
      console.log(this.lastAdvtId+'lastId')
      if(advtList.length<4) {
        console.log(advtList.length + '444')
        this.ss = true;
      }
      else{

        this.lastAdvtId=advtList[advtList.length-1].id;
      }
      this.advtList=this.advtList.concat(advtList);
    });
  }

  changeSubCategory(category:ICategory){
    this.selectedSubCategory=category;
    this.advtListReset=true;
  }
}
