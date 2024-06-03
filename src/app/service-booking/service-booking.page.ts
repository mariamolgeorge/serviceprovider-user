import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ServiceBooking } from '../Class/ServiceBooking';
import { ServicesService } from '../Providers/services.service';
import { AppConfig } from '../Class/AppConfig';
import { Users } from '../Class/users';
import { DatePipe } from '@angular/common';
declare var RazorpayCheckout: any;
@Component({
  selector: 'app-service-booking',
  templateUrl: './service-booking.page.html',
  styleUrls: ['./service-booking.page.scss'],
})
export class ServiceBookingPage implements OnInit {
servicebooking=new ServiceBooking();
appconfig=new AppConfig();
PaymentId: string = '';
today=new Date();
datepipe=new DatePipe('en-IND');
useraddress=new Users();
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private serviceservice:ServicesService) { 
    this.activatedRoute.queryParams.subscribe(params =>{
      // debugger;
      if(this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.ServiceBooking){
         this.servicebooking= this.router.getCurrentNavigation().extras.state.ServiceBooking;
         
         
      }
    })
  }

  ngOnInit() {
  }

  ChangeType(event)
  {
    if(event.target.checked==true)
   {
    this.servicebooking.PaymentType=1;
   }
   
  }
  ChangeTypePayment(event)
  {
    if(event.target.checked==true)
    {
     this.servicebooking.PaymentType=2;
    }
  }



  pay() {

    var paymentId;
    var me = this;
    // let r=this.servicebooking.Amount;
    var options = {
      description: 'Online Payment',
      image: '',
      currency: 'INR',
      key: this.appconfig.paymentkey,
      amount:(Number(this.servicebooking.Amount))* 100,
      name: 'BlueSky',
      prefill: {
        email: this.useraddress.Email,
        contact: this.useraddress.Mobile,
        name: this.useraddress.Name
      },
      theme: {
        color: '#4ec5c4'
      },
      handler: function (response) {
        alert(response.razorpay_payment_id);

      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };

    console.log(options);

    var successCallback = function (success) {
      var orderId = success.razorpay_order_id
      var signature = success.razorpay_signature
      me.PaymentId = success.razorpay_payment_id
      //alert('Payment Success, Payment Id: ' + me.PaymentId+'');

     // me.InsertTransaction();
     me.InsertServiceBooking();

    }

    var cancelCallback = function (error) {

      // me.alertservice.Alert(error.description + ' (Error ' + error.code + ')', 3, null, null);
      alert("error")
    }

    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options)
  }







InsertServiceBooking()
{
debugger;
    this.servicebooking.PaymentCode=this.PaymentId;
    if(this.servicebooking.ServiceDate.length<=0){ 
      this.servicebooking.ServiceDate=this.datepipe.transform(this.today,'dd-MMM-yyyy')
    }
    if(this.servicebooking.ServiceTime.length<=0){ 
      this.servicebooking.ServiceTime=this.datepipe.transform(this.today,'dd-MMM-yyyy')
    }
    if(this.servicebooking.ServiceName.length>0){
      this.servicebooking.UserId=JSON.parse(localStorage.getItem('user')).Id;
      this.serviceservice.InsertServiceBooking(this.servicebooking).subscribe((data:any)=>{
        if(data){
          if(data[0].Id>0 && data[0].Error==0){
             alert('Service booking  done successfully!');
           // this.alertservice.Alert('Category Inserted',1,null,null);
            this.router.navigate(['guest-user-home'])
          }
          else{
           alert('Error while Service booking  !' + data[0].Error.toString());
          //this.alertservice.Alert('Error while Category insert!' + data.Error.toString(),3,null,null);
          }
        }else{
        alert('Error while Service booking !')
         //this.alertservice.Alert('Error while Category insert!',3,null,null);
        }
      })
    }
   else{
   alert('Please Enter Service Name !')
  // this.alertservice.Alert('Please Enter Category Name !',2,null,null);
   }
  }

  Proceed(){
    if(localStorage.getItem('user')){
       if(this.servicebooking.PaymentType>0){
         if(this.servicebooking.PaymentType==1){    //cash on delivery
           this.InsertServiceBooking()
         }
         else{                                      //online payment
           this.pay();
         }
       }else{
         alert('Please select payment Type!')
       }
    }else{
      alert('Please Login/Register to continue !')
      this.router.navigate(['login']);
    }
  }
}


