import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../Class/AppConfig';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  appConfig=new AppConfig();
  constructor(public http: HttpClient) { }

  getGoogleAddress(lat: string, lng: string) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCWSjKbzKEOAJULQfG9rU2P-xLyDoC4l6M', options).pipe<any>(map(res => res));
  }

}
