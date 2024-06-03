import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../Class/AppConfig';
import{ catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {
  appconfig=new AppConfig();
  constructor(public http:HttpClient) { }


  GetAllServiceTimeSlotsWithServiceId(obj){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = {headers:headers};
    return this.http.get(this.appconfig.url + '/TimeSlot?serviceid='+obj, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
}
