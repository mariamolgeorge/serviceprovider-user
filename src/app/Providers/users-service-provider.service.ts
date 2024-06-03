import { Injectable } from '@angular/core';
import { AppConfig } from '../Class/AppConfig';
import{ catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { UsersServiceProvider } from '../Class/users-service-provider';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceProviderService {
  appconfig=new AppConfig();

  constructor( public http:HttpClient) { }

  

  GetAllServicesWithCityId(Id:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/UsersServiceProvider?cityid='+Id, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }

  
  GetAllLocations(){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url +'/Location', options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }



 
}
