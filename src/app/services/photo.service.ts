import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IPhoto} from "../models/photo";
import {Observable} from "rxjs";
import {IUser} from "../models/user";
import {environment} from "../../environments/environment";
import {PhotoFilter} from "../models/filters/photoFilter";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) {
  }

  createAdvtPhoto(model: IPhoto): Observable<IPhoto> {
    return this.http.post<IPhoto>('https://localhost:7097/v1/photos/', model)
  }

  getAdvtPhotosFilter(photoFilter:PhotoFilter): Observable<IPhoto[]> {
    let params = new HttpParams();
    if(photoFilter.advtId!=null)
      params=params.set("AdvtId", photoFilter.advtId);
    return this.http.get<IPhoto[]>(`${environment.apiUrl}/v1/photos/photoFilter`,{params})
  }

  deletePhoto(photoId:number){
    return this.http.delete(`${environment.apiUrl}/v1/photos/`+photoId)
  }
}
