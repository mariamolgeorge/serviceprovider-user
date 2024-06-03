import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert-info/alert-service.service';
import { ServicesService } from '../Providers/services.service';

@Component({
  selector: 'app-booking-history-details',
  templateUrl: './booking-history-details.page.html',
  styleUrls: ['./booking-history-details.page.scss'],
})
export class BookingHistoryDetailsPage implements OnInit {
bookings:any;
mob:string=''
callAssignDetailList:any[]=[];
  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,public alertservice:AlertService,public serviceservice:ServicesService) { 

    this.activatedRoute.queryParams.subscribe(params =>{
    //debugger;
      if(this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.History){
         this.bookings= this.router.getCurrentNavigation().extras.state.History;
      
         this.mob=this.bookings.TechnicianMobile;
      }
    })
  }

  ngOnInit() {
    this.GetAllCallAssignDetailsWithBookingId()
  }

  Call(mobno)

  {
    mobno=this.mob;
    debugger;
    window.open('tel:'+mobno,'_blank');
  }

  ViewBill()
    {
      if(this.bookings.Status==3||this.bookings.Status==4)
      {
        this.router.navigate(['bill',this.bookings.ServiceBookingId]);


      }
      else{
         this.alertservice.Alert("sorry invoice not generated?",2,null,null)
      }
  }
  back()
  {
    this.router.navigate(['booking-history'])
  }
  GetAllCallAssignDetailsWithBookingId(){
    this.serviceservice.GetAllCallAssignWithServiceBookingId(this.bookings.ServiceBookingId).subscribe((data:any)=>{
      if(data){
        this.callAssignDetailList=<Array<any>>data;
        //console.log(this.callAssignDetailList)
      }
    })
  }


}
