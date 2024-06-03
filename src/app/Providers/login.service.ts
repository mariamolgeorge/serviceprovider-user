import { Injectable } from '@angular/core';
import { AppConfig } from '../Class/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import{ catchError, map, retry } from 'rxjs/operators';
import { Users } from '../Class/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  appconfig = new AppConfig()

  constructor(public http:HttpClient) { }
  LoginWithEmailOrMobile(mobile,email){
    let headers=new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = { headers: headers };
    return this.http.get(this.appconfig.url+'/UserRegister?email='+email+'&mobile='+mobile,options).pipe<any>(map(res => res));
   }
  UpdateAddressAndName(user:Users){
    let headers=new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = { headers: headers };
    return this.http.post(this.appconfig.url+'/UserRegister',user,options).pipe<any>(map(res => res));
   }
   LoginWithOTP(id,password){
    let headers=new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = { headers: headers };
    return this.http.get(this.appconfig.url+'/UserRegister?Id='+id+'&password='+password,options).pipe<any>(map(res => res));
   }
   ResendVerificationOtp(Id: number) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appconfig.url + '/UserRegister?OtpId=' + Id, options).pipe<any>(map(res => res));
  }
  getGoogleAddress(lat: string, lng: string) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCWSjKbzKEOAJULQfG9rU2P-xLyDoC4l6M', options).pipe<any>(map(res => res));
  }

  

  UserLoginCheck(user:Users){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = {headers:headers};
    return this.http.get(this.appconfig.url + '/UsersLogin?UserName='+user.UserName+'&Password='+user.Password, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
}
