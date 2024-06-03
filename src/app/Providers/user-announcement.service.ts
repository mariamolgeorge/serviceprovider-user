import { Injectable } from '@angular/core';
import { AppConfig } from '../Class/AppConfig';
import{ catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAnnouncementService {
  appconfig=new AppConfig();
  constructor(public http:HttpClient) { }


  GetAllAnnouncementsUserSide(){
  
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/Announcement', options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }

  GetAllAnnouncementsWithType(Type){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/Announcement?type='+Type, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
}
