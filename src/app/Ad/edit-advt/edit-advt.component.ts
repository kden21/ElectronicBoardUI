import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAdvt, StatusAdvt} from "../../models/advt";
import {PhotoService} from "../../services/photo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IPhoto} from "../../models/photo";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdvtService} from "../../services/advt.service";

@Component({
  selector: 'app-edit-advt',
  templateUrl: './edit-advt.component.html',
  styleUrls: ['./edit-advt.component.css']
})
export class EditAdvtComponent implements OnInit {
  @Input() advt: IAdvt;
  @Output() editAdvt = new EventEmitter<boolean>();
  private routeSub: Subscription;
  ownerAdvtId:number;
  photosAdvt:IPhoto[]=[];
  deleteAdvtsId:number[]=[];
  uploadPhotos:string[]=[];
  photo: string;

  constructor(private photoService:PhotoService,
              private route:ActivatedRoute,
              private advtService:AdvtService,
              private router:Router) {
    this.routeSub = this.route.params.subscribe(params => {
      this.ownerAdvtId = parseInt(params['id'])
    });
  }

  form = new FormGroup({
    name: new FormControl<string>("",[Validators.required,Validators.maxLength(80)]),
    price: new FormControl<number>(parseInt("", ),[Validators.required,Validators.max(1000000000000)] ),
    description: new FormControl<string>("",[Validators.required,Validators.maxLength(1000)]),
  })

  showEditAdvt(showEditAdvt:boolean){
    this.editAdvt.emit(showEditAdvt)
  }

  ngOnInit(): void {
    this.photoService.getAdvtPhotosFilter({
      advtId: this.ownerAdvtId
    }).subscribe(res=>this.photosAdvt=res)
  }

  public onPhoto(event : any): void {
    for(let i=0;i<event.target.files.length;i++){
      const file = event.target.files[i];
      if (file == null){
        return;
      }
      //this.photoUploaded = false
      this.convertFile(file);
    }
  }

  convertFile(file: File){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof(reader.result) == 'string') {
        this.photo = reader.result.toString();
        console.log(this.photo)

      }
      this.uploadPhotos=this.uploadPhotos.concat(this.photo!)
      //this.photos.
      console.log(this.uploadPhotos)
      //this.photoUploaded = true;
    };

  }

  submit(){
    if(this.form.invalid){
      alert("форма невалидна");
      Object.values(this.form.controls).forEach(control=>{
        if(control.invalid){
          control.markAllAsTouched();
          control.updateValueAndValidity({onlySelf:true});
        }
      })
      return;
    }
    else {
      /*this.advtUploaded = false;
      if (this.photoUploaded == false) {
        console.log("Дождитесь загрузки фото")
        this.advtUploaded = true;
        return;
      }

      this.clicked = true;
*/

      this.advtService.updateAdvt(this.advt.id,{
        id: 0,
        name: (this.form.value['name'] as string)==""?this.advt.name:this.form.value['name'] as string,
        price: (this.form.value['price'] as number)==null?this.advt.price:this.form.value['price'] as number,
        description: (this.form.value['description'] as string)==""?this.advt.description:this.form.value['description'] as string,
        status: StatusAdvt.Actual,
        location: this.advt.location,
        categoryId: this.advt.categoryId,
        authorId: this.advt.authorId,
        createDate:this.advt.createDate
      }).subscribe(advt => {
        //this.advtResult=advt;
        console.log(this.advt.id+" id добавленного объявления")
        this.uploadPhotos.forEach((item) => {
          let photo:IPhoto=new class implements IPhoto {
            base64Str: string;
            advtId: number;
          };
          photo.base64Str=item;
          photo.advtId=this.advt.id;
          this.photoService.createAdvtPhoto(photo).subscribe(res=>{
            console.log(item+' фото добавлеяется')
          });

        });
        this.deleteAdvtsId.forEach((id)=>{
          console.log('advtsdeletedddd'+this.deleteAdvtsId)
          this.photoService.deletePhoto(id).subscribe(res=>console.log(id+" deletedPhoto"));

        })
        this.router.navigateByUrl(`/users/${ this.advt.authorId}`)
      })
    }
  }

  addPhotoInDelete(photoId:number|null, photoIndex:number, photos:IPhoto[]|string[]){
    photos=photos.splice(photoIndex, 1)
    console.log(photos)
    if(photoId!=null)
      this.deleteAdvtsId=this.deleteAdvtsId.concat(photoId);
    console.log(' фото готовится на удаление' + photoId);
  }
  deletePhoto(photo:IPhoto){
    this.photoService.deletePhoto(photo.id!).subscribe(res=>console.log(' !photo deleted'))
  }
}
