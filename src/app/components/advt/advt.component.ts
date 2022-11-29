import {Component, OnInit, Output} from '@angular/core';
import {IAdvt} from "../../models/advt";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {AdvtService} from "../../services/advt.service";
import {IUser, StatusRole} from "../../models/user";
import {UserService} from "../../services/user.service";
import {PhotoService} from "../../services/photo.service";
import {DadataSuggestService} from "../../services/dadata-suggest.service";
import {IAddress} from "../../models/address";

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

  @Output() user: IUser;
  @Output() userOwnAdvtId: number;


  isLoadAdvt$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadAdvtPhotos$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  photoIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

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
    this.viewingUser = this.userService.getViewUser();
  }

  deleteAdvt(advtId: number) {
    this.advtService.deleteAdvt(advtId).subscribe(c => this.router.navigateByUrl(`/users/${this.viewingUser.id}`));
  }

  addAdvtInFavorite(advtId: number, userId: number) {
    this.advtService.addInFavorite(advtId, userId).subscribe(res => console.log('okkkkkkkkkkkkkkkkkkkkkk'))
  }

}
