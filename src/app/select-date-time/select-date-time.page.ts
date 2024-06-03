import { Component, OnInit } from '@angular/core';
import { ServiceBooking } from '../Class/ServiceBooking';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { TimeSlotService } from '../Providers/time-slot.service';

@Component({
  selector: 'app-select-date-time',
  templateUrl: './select-date-time.page.html',
  styleUrls: ['./select-date-time.page.scss'],
})
export class SelectDateTimePage implements OnInit {
servicebooking=new ServiceBooking();
TimeList:any[]=[];
  constructor(public router:Router,public activatedRoute:ActivatedRoute,private timeslotservice:TimeSlotService) {
    this.activatedRoute.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.ServiceBooking){
         this.servicebooking= this.router.getCurrentNavigation().extras.state.ServiceBooking;
      }

    })
   }

  ngOnInit() {
    this. GetAllServiceTimeSlotsWithServiceId();
    
  }

  GetAllServiceTimeSlotsWithServiceId()
  {
debugger;
    let obj=this.servicebooking.ServiceId;
    this.timeslotservice. GetAllServiceTimeSlotsWithServiceId(obj).subscribe((data:any)=>{
      if(data.length>0){
        this.TimeList=<Array<any>>data;
      }
      else{
        this.TimeList=[];
      }
    })
   }

  submit(){
    let navigationExtras:NavigationExtras={
      state:{
        ServiceBooking:this.servicebooking
      } 
    }
    this.router.navigate(['service-details'],navigationExtras)
  }

  SelectTime(event){
    this.servicebooking.ServiceTime=event;
  }
  
}
