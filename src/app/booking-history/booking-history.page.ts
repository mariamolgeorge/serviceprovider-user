import { Component, OnInit } from '@angular/core';
//import { ServicesService } from '../Providers/services.service';
import { AlertService } from 'src/app/alert-info/alert-service.service';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServicesService } from '../Providers/services.service';
import { UserAnnouncementService } from '../Providers/user-announcement.service';
import { Users } from '../Class/users';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.page.html',
  styleUrls: ['./booking-history.page.scss'],
})
export class BookingHistoryPage implements OnInit {
  TabType:number=1;
  servicebookingList:any[]=[];
  servicebookingListFilter:any[]=[];
  pastservicebookingList:any[]=[];
  pastservicebookingListFilter:any[]=[];
  user=new Users();
  
  constructor(public servicebookingservice:ServicesService,
    private activatedRoute:ActivatedRoute,
    private router:Router) {
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.GetAllLiveServiceBooking();
        this.GetAllPastServiceBooking();
      }
     }

  ngOnInit() {
    
   
  }
  ChangeTab(val){
    this.TabType=val;
    }

    
  GetAllLiveServiceBooking(){
    debugger;

     this.user= JSON.parse(localStorage.getItem('user'));
    this.servicebookingservice.GetAllLiveServiceBookings(this.user.Id).subscribe((data:any)=>{
      if(data.length>0){
        this.servicebookingList=data.filter(x=>x.Status!=4);
        this.servicebookingListFilter= this.servicebookingList ;
        console.log( this.servicebookingListFilter)

      }
      else{
        this.servicebookingList=[];
        this.servicebookingListFilter=[];
      }
    })
  }

    
  GetAllPastServiceBooking(){
    this.user = JSON.parse(localStorage.getItem('user'));
    this.servicebookingservice.GetAllPastServiceBookings(this.user.Id).subscribe((data:any)=>{
      if(data.length>0){
        this.pastservicebookingList=data.filter(x=>x.Status=4);
        this.pastservicebookingListFilter= this.pastservicebookingList ;
        console.log( this.pastservicebookingListFilter)

      }
      else{
        this.pastservicebookingList=[];
        this.pastservicebookingListFilter=[];
      }
    })
  }
back()
{
  // alert('hii')
  this.router.navigate(['guest-user-home'])
}
  NavigateToDetails(item:any){
  // debugger
    let navigationExtras:NavigationExtras={
     state:{
      History:item
     } 
    }
    this.router.navigate(['booking-history-details'],navigationExtras)
   }
  
  Call(mobno)
  {
    window.open('tel:'+mobno,'_blank');
  }
    // ViewSearch() {
    //   if (this.searchClass == "search-con") {
    //     this.searchClass = "search-con addsearch";
    //     this.searchIconClass = "fas fa-times";
    //   }
    //   else {
    //     this.searchClass = "search-con";
    //     this.searchIconClass = "fas fa-search";
    //     this.searchTerm = "";
    //     this.CallAssignListFilter=this.CallAssignList.filter(x=>(x.Status==0 || x.Status==8) && x.ServiceBookingStatus==2);
    //     this.CompletedList=this.CallAssignList.filter(x=>x.Status!=0 && x.Status!=8 && x.ServiceBookingStatus==2)
    //     this.BillList=this.CallAssignList.filter(x=>x.ServiceBookingStatus==3);
    //   }
    // }
    // onSearchInput() {
    //   this.searching = true;
    //   this.setFilteredItems();
    // };
    // setFilteredItems() {
    //   if(this.TabType==1){
    //     this.CallAssignListFilter= this.filterItems(this.searchTerm);
    //   }else if(this.TabType==2){
    //     this.CompletedList= this.filterItems(this.searchTerm);
    //   }else if(this.TabType==3){
    //     this.BillList= this.filterItems(this.searchTerm);
    //   }
     
    // };
    // filterItems(searchTerm) {
    //   if (this.searchTerm == "") {
    //    // this.CallAssignListFilter=this.CallAssignList;
    //   }
    //   return this.CallAssignList.filter((item) => {
    //     return (item.CustomerName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
    //     item.ServiceName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    //   });
    // };
  
}
