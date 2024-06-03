import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../Class/AppConfig';
import{ catchError, map, retry } from 'rxjs/operators';
//import { CityServiceMapping } from '../Class/CityServiceMapping';
//import { CityWiseService } from '../Class/CityWiseService';


@Injectable({
  providedIn: 'root'
})
export class CityServiceMapingService {

  appconfig=new AppConfig();
  // citywiseservice=new CityWiseService();

  constructor(public http:HttpClient) { }
  

  GetAllCities(){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = {headers:headers};
    return this.http.get(this.appconfig.url + '/Country', options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
 

  GetCityDetailsWithCityId(CityId:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/Country?CityId='+CityId, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
  


}
