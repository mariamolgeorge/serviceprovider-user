import { Component, OnInit } from '@angular/core';
//import { AgmCoreModule } from '@agm/core';
import { ServiceBooking } from '../Class/ServiceBooking';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {MouseEvent} from '@agm/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.page.html',
  styleUrls: ['./select-address.page.scss'],
})
export class SelectAddressPage implements OnInit {
servicebooking=new ServiceBooking()
zoom:number=12;

  constructor(private geolocation: Geolocation,public router:Router,public activatedRoute:ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.ServiceBooking){
         this.servicebooking= this.router.getCurrentNavigation().extras.state.ServiceBooking;
      }

    })
  }

  ngOnInit() {
  }

  markerDragEnd($event: MouseEvent) {
    this.servicebooking.Latitude =Number($event.coords.lat) ;
    this.servicebooking.Longitude =Number( $event.coords.lng);
console.log(this.servicebooking.Latitude);

  }

  ionViewWillEnter(){
    this.getLiveLocation();
  }

  getLiveLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.servicebooking.Latitude =Number( position.coords.latitude);
      this.servicebooking.Longitude =Number( position.coords.longitude);
     
      if (position) {

      }
    });
    // }
    // }

  }

  submit(){
    let navigationExtras:NavigationExtras={
      state:{
        ServiceBooking:this.servicebooking
      } 
    }
    this.router.navigate(['service-details'],navigationExtras)
  }

}
