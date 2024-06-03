import { Injectable } from '@angular/core';
import { AppConfig } from '../Class/AppConfig';
import{ catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Services } from '../Class/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  appconfig=new AppConfig();
  constructor(public http:HttpClient) { }

  GetAllServices(){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/Services', options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }



  GetAllServicesWithServiceId(Id:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/Services?id='+Id, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }

  GetAllServicesWithPincode(Pincode:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/Services?pincode='+Pincode, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
  InsertServiceBooking(serviceBooking)
  {
    let headers=new HttpHeaders();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    let options={headers:headers};
    return this.http.post(this.appconfig.url +"/ServiceBooking",serviceBooking,options).pipe(retry(3), catchError(() => { return null }), map(res => res));

  }
  GetAllCategoryWithPincode(pincode){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/Category?pincode='+pincode, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }

  GetTop12ServicesWithPincode(Pincode:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/Services?code='+Pincode+'&num='+0, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }

  GetAllrateChartWihServiceId(ServiceId:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/Services?serviceid='+ServiceId, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
  GetAllLiveServiceBookings(Id:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/LiveCall?UserId='+Id, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
  GetAllPastServiceBookings(Id:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/PastCall?UserId='+Id, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
  GetAllBillDetailsWithBookingId(bookingid){
    let headers=new HttpHeaders();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    let options={headers:headers};
    return this.http.get(this.appconfig.url + '/ServiceBooking?bid='+bookingid, options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
  UpdateBillAmountWithServiceBookingId(amnt,sbid)
  {
    let headers=new HttpHeaders();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    let options={headers:headers};
    return this.http.get(this.appconfig.url +"/ServiceBooking?amnt="+amnt+"&sbid="+sbid,options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
  GetAllCallAssignWithServiceBookingId(bookingid)
  {
    let headers=new HttpHeaders();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    let options={headers:headers};
    return this.http.get(this.appconfig.url + "/CallAssign?servicebookingid="+bookingid,options).pipe(retry(3), catchError(() => { return null }), map(res => res));
  }
}
