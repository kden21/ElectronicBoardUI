import {Component, OnInit, Output} from '@angular/core';
import {IAdvt, StatusAdvt} from "../../models/advt";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {AdvtService} from "../../services/advt.service";
import {IUser} from "../../models/user";
import {UserService} from "../../services/user.service";
import {PhotoService} from "../../services/photo.service";
import {DadataSuggestService} from "../../services/dadata-suggest.service";
import {StatusUser} from "../../models/filters/userFilter";

@Component({
  selector: 'app-advt',
  templateUrl: './advt.component.html',
  styleUrls: ['./advt.component.css']
})
export class AdvtComponent implements OnInit {

  private routeSub: Subscription;
  private id: number;
  editAdvt: boolean = false;
  writeReview: boolean = false;
  writeReport: boolean = false;
  showPhoto: boolean = false;
  createDateAdvt: string;

  advtShow: IAdvt;
  viewingUser: IUser;


  @Output() userOwnAdvtId: number;


  isLoadAdvt$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadAdvtPhotos$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isFavoriteAdvt$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  photoIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  userVoters:IUser[]=[];

  constructor(private route: ActivatedRoute,
              private advtService: AdvtService,
              private userService: UserService,
              private photoService: PhotoService,
              private router: Router,
              private suggestService: DadataSuggestService
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = parseInt(params['id'])
    });
  }

  showEditAdvt(showElement: boolean) {
    showElement == true ? this.editAdvt = true : this.editAdvt = false;
  }

  showWriteReview(showElement: boolean) {
    showElement == true ? this.writeReview = true : this.writeReview = false;
  }

  showWriteReport(showElement: boolean) {
    showElement == true ? this.writeReport = true : this.writeReport = false;
  }

  showPhotoAdvt(showElement: boolean) {
    showElement == true ? this.showPhoto = true : this.showPhoto = false;
  }

  getPhotoIndexLeft() {
    this.photoIndex$.next(this.photoIndex$.value - 1)
  }

  getPhotoIndexRight() {
    this.photoIndex$.next(this.photoIndex$.value + 1)
  }

  ngOnInit(): void {
    this.advtService.getById(this.id).subscribe(advt => {
      this.advtShow = advt,

        this.viewingUser = this.userService.getViewUser();

        this.userService.getAllFilter({
          advtFavoriteId: advt.id,
          status: StatusUser.Actual
        }).subscribe(res=> {
          this.userVoters=res;
          this.checkFavoriteAdvt();
        })

      this.userOwnAdvtId = advt.authorId;

      this.suggestService.getSuggest(advt.location).subscribe(res=>{
        let stringJson = JSON.stringify(res);
        let objJson = JSON.parse(stringJson);
        this.advtShow.location=objJson.suggestions[0].data.city;
      })

      this.photoService.getAdvtPhotosFilter({
        advtId: advt.id
      }).subscribe(res => {



        this.advtShow.photo = [];
        res.forEach((item) => {
          this.advtShow.photo = this.advtShow.photo?.concat(item.base64Str);
        })
        this.isLoadAdvtPhotos$.next(true);
        this.isLoadAdvt$.next(true);
      })
    });
  }

  deleteAdvt(advtId: number) {
    this.advtService.deleteAdvt(advtId).subscribe(c => this.router.navigateByUrl(`/users/${this.viewingUser.id}`));
  }

  addAdvtInFavorite(advtId: number, userId: number) {
    this.advtService.updateFavoriteAdvt(advtId, userId, StatusAdvt.Actual).subscribe(res =>
      this.isFavoriteAdvt$.next(true))
  }

  deleteAdvtFromFavorite(advtId: number, userId: number) {
    this.advtService.updateFavoriteAdvt(advtId, userId, StatusAdvt.Archive).subscribe(res => this.isFavoriteAdvt$.next(false))
  }

  checkFavoriteAdvt(){
    console.log('viewingUser.id '+this.viewingUser.id)
    this.userVoters.forEach((user)=>{
      console.log('userId '+user.id)
      if(user.id==this.viewingUser.id){
        this.isFavoriteAdvt$.next(true);
        console.log('Да, оно в избранном')
      }
    })
  }

}
