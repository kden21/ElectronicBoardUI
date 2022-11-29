import {Component, Input, OnInit} from '@angular/core';
import {AdvtService} from "../../services/advt.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from 'src/app/models/user';
import {CategoryService} from "../../services/category.service";
import {ICategory} from "../../models/category";
import {Router} from "@angular/router";
import {IAdvt, StatusAdvt} from 'src/app/models/advt';
import {BehaviorSubject} from "rxjs";
import {PhotoService} from "../../services/photo.service";
import {IPhoto} from "../../models/photo";
import {DadataSuggestService} from "../../services/dadata-suggest.service";
import {IAddress} from "../../models/address";

@Component({
  selector: 'app-advt-add-card',
  templateUrl: './advt-add-card.component.html',
  styleUrls: ['./advt-add-card.component.css']
})
export class AdvtAddCardComponent implements OnInit {

  @Input() user: IUser;
  base64Output: string;

  photo: string;
  photos: string[] = [];

  advtResult: IAdvt;
  photoUploaded: boolean = true;
  advtUploaded: boolean | null = null;
  clicked = false;
  categories: ICategory[];

  touchedCategory: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showCategories: boolean = false;

  location: IAddress = new class implements IAddress {
    cityFiasId: string;
    cityName: string;
  };

  citySuggest: BehaviorSubject<IAddress[]> = new BehaviorSubject<IAddress[]>([]);
  isLocationFocused:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isLocationHovered:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  subCategory: ICategory = new class implements ICategory {
    id: number = 0;
    name: string = "Выберите категорию";
  }

  constructor(
    private advtService: AdvtService,
    private categoryService: CategoryService,
    private router: Router,
    private photoService: PhotoService,
    private suggestService: DadataSuggestService
  ) {
  }

  form = new FormGroup({
    name: new FormControl<string>("", [Validators.required, Validators.maxLength(80)]),
    price: new FormControl<number>(parseInt("",), [Validators.required, Validators.maxLength(20)]),
    description: new FormControl<string>("", [Validators.required, Validators.maxLength(1000)]),
    location: new FormControl<string>(""),
    city: new FormControl<string>(""),
  })

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  deletePhoto(photoIndex: number) {
    this.photos.splice(photoIndex, 1)
  }

  touchedCat() {
    this.touchedCategory.next(true);
    this.showCategories = (!this.showCategories);
  }

  submit() {
    if (this.form.invalid || this.location.cityName == undefined || this.subCategory.id == 0) {
      alert("форма невалидна");
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAllAsTouched();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
      return;
    } else {
      this.advtUploaded = false;
      if (this.photoUploaded == false) {
        console.log("Дождитесь загрузки фото")
        this.advtUploaded = true;
        return;
      }
      this.clicked = true;
      this.suggestService.getSuggest(this.form.value['location'] as string).subscribe(res => {

      })
      this.advtService.create({
        id: 0,
        name: this.form.value['name'] as string,
        price: this.form.value['price'] as number,
        description: this.form.value['description'] as string,
        status: StatusAdvt.Actual,
        location: this.location!.cityFiasId,
        categoryId: this.subCategory.id,
        authorId: this.user.id!
      }).subscribe(advt => {
        this.advtResult = advt;
        this.photos.forEach((item) => {
          let photo: IPhoto = new class implements IPhoto {
            base64Str: string;
            advtId: number;
          };
          photo.base64Str = item;
          photo.advtId = this.advtResult.id;

          this.photoService.createAdvtPhoto(photo).subscribe(res => {
            console.log(item + ' фото добавлеяется')
          });
        });
        this.advtUploaded = true;
        this.router.navigateByUrl(`/advts/${this.advtResult.id}`)
      })
    }
  }

  public onPhoto(event: any): void {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      if (file == null) {
        return;
      }
      this.photoUploaded = false;
      this.convertFile(file);
    }
  }

  convertFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof (reader.result) == 'string') {
        this.photo = reader.result.toString();
      }
      this.photos = this.photos.concat(this.photo!)
      this.photoUploaded = true;
    };
  }

  getLocation(): void {
    let cityName = this.form.value['location'] == "" ? "Укажите город" : this.form.value['location'];
    this.citySuggest.next([]);
    if (cityName !== null) {
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
          this.citySuggest.next(this.citySuggest.value.concat(address));
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
