import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class DadataSuggestService {

  constructor(private http: HttpClient) {
  }
  getSuggest(cityName:string) {
    let params = new HttpParams();
    if (cityName != null)
      params = params.set("cityName", cityName);
    return this.http.get("https://localhost:7097/v1/address/getSuggestions", {params});
  }

  getById(cityFiasId:string){
    let params = new HttpParams();
    if (cityFiasId != null)
      params = params.set("cityFiasId", cityFiasId);
    return this.http.get(`${environment.apiUrl}/v1/address/getById`, {params})
  }

}
