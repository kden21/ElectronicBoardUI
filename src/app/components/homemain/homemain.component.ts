import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ICategory} from "../../models/category";
import {IAdvt} from "../../models/advt";
import {AdvtService} from "../../services/advt.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdvtFilter, Status} from "../../models/filters/advtFilter";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpParams} from "@angular/common/http";
import {DadataSuggestService} from "../../services/dadata-suggest.service";
import {IAddress} from "../../models/address";

@Component({
  selector: 'app-homemain',
  templateUrl: './homemain.component.html',
  styleUrls: ['./homemain.component.css']
})
export class HomemainComponent implements OnInit {


  @Output() advtList: IAdvt[] = [];
  @Output() valueTitle: BehaviorSubject<string>=new BehaviorSubject<string>("Актуальные объявления")

  lastAdvtId: number | null;
  countAdvt: number = 4;
  advtListReset: boolean = true;
  ss: boolean | null = null;

  filterAdvt: AdvtFilter = new AdvtFilter();

  isLocationFocused:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isLocationHovered:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

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
    userId: new FormControl<number>(parseInt("")),
    photo: new FormControl<string>(""),
  })

  private querySubscription: Subscription;
  search?: string;
  location:IAddress;
  cityList:BehaviorSubject<IAddress[]>=new BehaviorSubject<IAddress[]>([]);

  constructor(private categoryService: CategoryService,
              private advtService: AdvtService,
              private route: ActivatedRoute,
              private router: Router,
              private suggestService: DadataSuggestService) {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.search = queryParam['search'];
      })

  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
    this.getFilterAdvtList()
  }

  navigation() {
    this.router.navigate(
      [],
      {
        queryParams: {
            'search': this.form.value['description'] == "" ? null : this.form.value['description'],
            'categoryId': this.selectedSubCategory.id == 0 ? null : this.selectedSubCategory.id,
            'city': this.form.value['location'] == "" ? null : this.form.value['location'],
            'photo': this.form.value['photo'] == "" ? null : this.form.value['photo'],
        }
      }
    )
    this.changeCategory(this.selectedSubCategory);
    this.getFilterAdvtList();
  }

  getFilterAdvtList(){
    console.log(this.form.value['photo']+' photo')

    if(this.advtListReset == true) {
      this.lastAdvtId = null;
      this.advtList = [];
      this.ss = null;
    }
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.filterAdvt.description = this.form.value['description'] == "" ? null : this.form.value['description'];
        this.filterAdvt.categoryId = this.selectedSubCategory.id;
        this.filterAdvt.location = this.location==undefined?'':this.location.cityFiasId;
        this.filterAdvt.lastAdvtId = this.lastAdvtId;
        this.filterAdvt.count = this.countAdvt;

        this.filterAdvt.isExistPhoto= this.form.value['photo'] == "" ? false : true
      })
    this.advtService.getAllFilter(this.filterAdvt).subscribe(advtList => {
      if (this.advtListReset == true && advtList.length == 0) {
        this.valueTitle.next("Мы искали, но ничего не нашли...");
        this.ss = null;
      } else {

        if (advtList.length < 4) {
          this.ss = true;
          this.advtListReset = false;
        } else {
          this.lastAdvtId = advtList[advtList.length - 1].id;
          this.filterAdvt.lastAdvtId=this.lastAdvtId
          this.ss = false;
          this.advtListReset = false;
        }

        this.advtList = this.advtList.concat(advtList);
      }
    });
  }

  changeCategory(cat:ICategory){
    this.selectedSubCategory = cat;
    this.advtListReset=true;
  }

  getLocation(): void {
    let cityName=this.form.value['location'] == "" ? "Укажите город" : this.form.value['location'];
    this.cityList.next([]);
    if(cityName!==null) {
      this.suggestService.getSuggest(cityName!).subscribe(r => {
        let stringJson = JSON.stringify(r);
        let objJson = JSON.parse(stringJson);
        objJson.suggestions.forEach((item: any) => {
          let address: IAddress = new class implements IAddress {
            cityFiasId: string;
            cityName: string;
          }
          address.cityName = item.data.city;
          address.cityFiasId = item.data.city_fias_id;
          this.cityList.next(this.cityList.value.concat(address))
        })
      })
    }
  }

  onLocationFocus(){
    this.isLocationFocused.next(true);
  }
  onLocationBlur() {
    this.isLocationFocused.next(false);
  }

  onLocationHover(){
    this.isLocationHovered.next(true);
  }

  onLocationNoHover(){
    this.isLocationHovered.next(false);
  }
}
