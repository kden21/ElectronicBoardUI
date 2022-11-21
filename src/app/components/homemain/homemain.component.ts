import {Component, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ICategory} from "../../models/category";
import {IAdvt} from "../../models/advt";
import {AdvtService} from "../../services/advt.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdvtFilter, Status} from "../../models/filters/advtFilter";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-homemain',
  templateUrl: './homemain.component.html',
  styleUrls: ['./homemain.component.css']
})
export class HomemainComponent implements OnInit {

  //ss: boolean = new BehaviorSubject<boolean>(false)//IAdvt[]=[];
  @Output() advtList: IAdvt[] = [];
  @Output() valueTitle: string = "Актуальные объявления";

  lastAdvtId: number | null;
  countAdvt: number = 4;
  advtListReset: boolean = true;
  //isAdvtListExist:boolean=false;
  ss: boolean | null = null;

  filterAdvt:AdvtFilter=new AdvtFilter();
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
    description: new FormControl<string>("", [Validators.required, Validators.minLength(5)]),
    location: new FormControl<string>(""),
    count: new FormControl<number>(parseInt("")),
    userId: new FormControl<number>(parseInt(""))
  })

  private querySubscription: Subscription;
  search?: string;

  constructor(private categoryService: CategoryService, private advtService: AdvtService, private route: ActivatedRoute,  private router: Router) {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.search = queryParam['search'];
      })

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.changeSubCategory(this.selectedSubCategory)
      this.getFilterAdvtList();
    });
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });

    //this.getFilterAdvtList()
  }

  navigation(){
      this.router.navigate(
        ['/'],
        {queryParams:
            {
              'search': this.form.value['description'] == "" ? null : this.form.value['description'],
              'categoryId': this.selectedSubCategory.id == 0 ? null : this.selectedSubCategory.id,
              'city': this.form.value['location'] == "" ? null : this.form.value['location'],
            }}
      );
    //}
  }


  getFilterAdvtList() {
    // this.querySubscription = this.route.queryParams.subscribe(
    //   (queryParam: Params) => {
    //     this.search = queryParam['search'];
    //     //this.params = params['search'];
    //   })


    if (this.advtListReset == true) {
      this.lastAdvtId = null;
      this.advtList = [];
      this.ss = null;
    }
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.filterAdvt.description = queryParam['search'];
        this.filterAdvt.categoryId=queryParam['categoryId'] as number;
        this.filterAdvt.location=queryParam['city'];
        this.filterAdvt.lastAdvtId=this.lastAdvtId;
        this.filterAdvt.count=this.countAdvt;
      })
    this.advtService.getAllFilter(this.filterAdvt).subscribe(advtList => {

      if (this.advtListReset == true && advtList.length == 0) {
        this.valueTitle = "Мы искали, но ничего не нашли...";
        this.ss = null;
      } else {
        // if(this.advtListReset==true&&advtList.length!=0){
        //   this.advtListReset=false
        // }
        //else{
        if (advtList.length < 4) {
          this.ss = true;
          this.advtListReset = false;
        } else {
          this.lastAdvtId = advtList[advtList.length - 1].id;
          this.ss = false;
          this.advtListReset = false;
        }

        this.advtList = this.advtList.concat(advtList);
        // }
      }


    });
  }

  changeSubCategory(cat:ICategory) {
    if (cat.id == this.selectedSubCategory.id) {
      console.log(this.selectedSubCategory.id+'s1')
      console.log(cat.id+'c1')
      this.selectedSubCategory.id = 0
      this.selectedSubCategory.name="Подкатегория"
      console.log('true')
      console.log(this.selectedSubCategory.id+'s2')
    }
    else {
      this.selectedSubCategory = cat;
      console.log(this.selectedSubCategory.id + 's false')
      console.log(cat.id + 'c1')
      console.log('false')
    }
    this.advtListReset = true;

    this.valueTitle = "Актуальные объявления";
    this.advtListReset = true;
    // this.changeSubCategory(this.selectedSubCategory)
    // this.getFilterAdvtList();
  }
}
