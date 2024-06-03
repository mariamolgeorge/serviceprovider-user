import { Injectable } from '@angular/core';
import { AppConfig } from '../Class/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppVersionService {
  appconfig=new AppConfig();
  constructor(public http: HttpClient) { }


  // GetAppVersion() 
  // {
  //   let headers = new HttpHeaders();
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json');
  //   let options = { headers: headers };
  //   return this.http.get(this.appconfig.url +'/AppVersion', options).pipe<any>(map(res => res));
  // }

  GetAppVersion() 
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appconfig.url +'/api/AppVersion?Type=2', options).pipe<any>(map(res => res));
  }
}
