import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Providers/services.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Services } from '../Class/services';
import { ServiceBooking } from '../Class/ServiceBooking';
import { Users } from '../Class/users';
import { AppConfig } from '../Class/AppConfig';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
services=new Services();
servicebooking=new ServiceBooking();
useraddress=new Users();
appconfig=new AppConfig();
  constructor(public servicesservice:ServicesService,private router:Router,private activatedRoute:ActivatedRoute) { 

    this.activatedRoute.queryParams.subscribe(params =>{
      // debugger;
      if(this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.Item){
         this.services= this.router.getCurrentNavigation().extras.state.Item;
         this.servicebooking.ServiceName=this.services.Name;
         this.servicebooking.ServiceId=this.services.Id;
         this.servicebooking.UserId=this.useraddress.Id; 
        this.servicebooking.Amount=this.services.AdvanceAmount; 
        this.servicebooking.Amount=0; 

        this.servicebooking.LocationId=this.services.LocationId;
        this.servicebooking.SupervisorId=this.services.SupervisorId;

        
      }

      if(this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.ServiceBooking){
         this.servicebooking= this.router.getCurrentNavigation().extras.state.ServiceBooking;
      }

      // if(this.router.getCurrentNavigation().extras.state &&
      // this.router.getCurrentNavigation().extras.state.ServiceBookingg){
      //    this.servicebooking= this.router.getCurrentNavigation().extras.state.ServiceBookingg;
      // }


    })
  }

  ngOnInit() {
    
  }

  back(){
    this.router.navigate(['guest-user-home'])
  }

  handleDisplayImgError(ev: any) {
    let source = ev.srcElement;
    let imgSrc = this.appconfig.AssetUrl + "/assets/img/service.png";
    source.src = imgSrc;
  
  }
  NavigateToServiceBooking()
  {
    let navigationExtras:NavigationExtras={
      state:{
        ServiceBooking:this.servicebooking
      } 
    }
    this.router.navigate(['service-booking'],navigationExtras)
    
  }
  changeservicetype()
  {
    this.servicebooking.ServiceType=1;

  }
  change()
  {
    this.servicebooking.ServiceType=2;
  }
Address()
{
  let navigationExtras:NavigationExtras={
    state:{
      ServiceBooking:this.servicebooking
    } 
  }
  this.router.navigate(['select-address'],navigationExtras)
 
}
DateTime()
{
  let navigationExtras:NavigationExtras={
    state:{
      ServiceBooking:this.servicebooking
    } 
  }
  this.router.navigate(['select-date-time'],navigationExtras)
 

}
}
