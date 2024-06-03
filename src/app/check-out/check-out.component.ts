import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ServiceBooking } from '../Class/ServiceBooking';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MouseEvent } from '@agm/core';
import { AlertService } from '../alert-info/alert-service.service';
import { TimeSlotService } from '../Providers/time-slot.service';
import { DatePipe } from '@angular/common';
import { Users } from '../Class/users';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../Providers/services.service';
import { AppConfig } from '../Class/AppConfig';
import { ValidationProvider } from '../Providers/validation';
import { LoadingController } from '@ionic/angular';
import { LoginService } from '../Providers/login.service';
declare var RazorpayCheckout: any;
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  @Input() servicebooking = new ServiceBooking();
  @Output() newBookingEvent: EventEmitter<boolean> = new EventEmitter();
  isAdress: boolean = false;
  isDateTime: boolean = false;
  isServiceBooking = true;
  isLogin: boolean = false;
  zoom: number = 15;
  TimeList: any[] = [];
  TimeList1: any[] = [];
  OnlyTimes: any[] = [];
  dateSlotList: any[] = [];
  PaymentId: string = '';
  today = new Date();

  TimeSlot: boolean = false;
  datepipe = new DatePipe('en-IND');
  user = new Users();
  appconfig = new AppConfig();
  IsOTP: boolean = false;
  IsRegister: boolean = false;
  IsLogin: boolean = false;
  username: string = "";
  locationdata: any;
  isSuccess: boolean = false;
  isFail: boolean = false;
  isCalendar: boolean = false;
  CollapseType: number = 1;
  RateChartList: any[] = [];
  todaysDate: any;
  isBankDetails: boolean = false;
  tempid: number = 0;
  showdate: boolean;
  caldate: any;
  timesloths: boolean = true;
  isShow: boolean=false;
  constructor(private geolocation: Geolocation, public alertservice: AlertService,
    private timeslotservice: TimeSlotService, private router: Router, private activatedRoute: ActivatedRoute,
    private serviceservice: ServicesService, private validationservice: ValidationProvider,
    private userservice: LoginService,
    public loadingCtrl: LoadingController) {
    this.servicebooking.ServiceDate = this.datepipe.transform(this.today, 'MM-dd-yyyy');

  }

  ngOnInit() {

    this.next7Days();
    this.getLiveLocation();
    this.GetRateChartList();

  }



  formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    date = mm + '/' + dd + '/' + yyyy;
    return date;
  }

  next7Days() {

    //code added by praveesh 16/12/21 for hide current date.

    if (this.servicebooking.ServiceType == 2) {
      this.dateSlotList = [];
      for (var i = 0; i < 7; i++) {
        var d = new Date();
        d.setDate(d.getDate() + 1 + i);
        this.TimeSlot=true;
        this.dateSlotList.push({ Date: this.formatDate(d), isActive: i == 0 ? true : false })
      }
      return (this.dateSlotList);
    }
    else {
      this.dateSlotList = [];
      for (var i = 0; i < 7; i++) {
        var d = new Date();
        d.setDate(d.getDate() + i);
        this.dateSlotList.push({ Date: this.formatDate(d), isActive: i == 0 ? true : false })
      }
      return (this.dateSlotList);
    }
    //code added by praveesh 16/12/21 for hide current date.

    
    //commented by praveesh 16/12/21

    // this.dateSlotList = [];
    // for (var i = 0; i < 7; i++) {
    //   var d = new Date();
    //   d.setDate(d.getDate() + i);
    //   this.dateSlotList.push({ Date: this.formatDate(d), isActive: i == 0 ? true : false })
    // }
    // return (this.dateSlotList);

//commented by praveesh 16/12/21
  }



  CloseBooking() {
    this.servicebooking = new ServiceBooking();
    this.newBookingEvent.emit(false);
  }

  ngOnChanges() {
    this.servicebooking = this.servicebooking;

    this.GetRateChartList();

  }

  changeservicetype(val) {
    this.servicebooking.ServiceType = val;
  }


  Toggle(val) {
    if (val == 1) {
      this.isAdress = true;
      this.isServiceBooking = false;
      this.isDateTime = false;
      this.isLogin = false;
    } else if (val == 2) {
      this.GetAllServiceTimeSlotsWithServiceId();
      this.isAdress = false;
      this.isServiceBooking = false;
      this.isDateTime = true;
      this.isLogin = false
    }
  }


  ContinueBooking() {
    if (localStorage.getItem('user')) {
      this.isAdress = true;
      this.isServiceBooking = false;
      this.isDateTime = false;
    } else {
      this.alertservice.Alert('Please Login/Register to continue!', 2, null, null);
      this.isLogin = true; this.IsLogin = true;
    }
  }


  CloseAddress() {
    this.servicebooking.Address = '';
    this.isAdress = false;
    this.isServiceBooking = true;
    this.isDateTime = false;
  }

  CloseDateTime() {
    this.isAdress = true;
    this.isServiceBooking = false;
    this.isDateTime = false;
  }

  markerDragEnd($event: MouseEvent) {
    this.servicebooking.Latitude = Number($event.coords.lat);
    this.servicebooking.Longitude = Number($event.coords.lng);
    console.log(this.servicebooking.Latitude);

  }

  getLiveLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.servicebooking.Latitude = Number(position.coords.latitude);
      this.servicebooking.Longitude = Number(position.coords.longitude);
      console.log(position);
      if (position) {
      }
    });
  }

  onDateClick(date) {
    console.log(date);
this.isShow=true;
    let d = date;
    d = this.datepipe.transform(d.Date, 'MM/dd/yyyy')
    let datenow = this.datepipe.transform(this.today, 'MM/dd/yyyy')
    debugger
    if (d != datenow) {
      this.timesloths = false;
    } else if (d == datenow) {
      this.timesloths = true;

    }

    if (this.isCalendar == false) {
      this.dateSlotList.find(s => s.isActive == true).isActive = false;
      this.dateSlotList.find(s => s.Date == date.Date).isActive = true;
      this.servicebooking.ServiceDate = date.Date;
      this.GetAllServiceTimeSlotsWithServiceId();

      this.isCalendar = false;

    }
    else {
      this.dateSlotList.find(s => s.Date == date.Date).isActive = true;
      this.servicebooking.ServiceDate = date.Date;
      this.isCalendar = false;
      this.GetAllServiceTimeSlotsWithServiceId();

    }

  }


  SelectTime(item) {
    this.servicebooking.ServiceTime = item.StartTime;
  }
  Timeslotavailabecheck(starttime) {

  }

  CheckCurrentTime(starttime) {//for disabling timeslots
    this.servicebooking.ServiceDate = this.datepipe.transform(this.servicebooking.ServiceDate, 'MM-dd-yyyy');
    let t2day = this.datepipe.transform(this.today, 'MM-dd-yyyy')


    if (this.servicebooking.ServiceDate > t2day) {
      return false;


    } else {
      starttime = this.datepipe.transform(starttime, 'HH:mm:ss a')
      let timenow = this.datepipe.transform(this.today, 'HH:mm:ss a')
      console.log("starttime", starttime);
      console.log("timenow", timenow);

      if (starttime < timenow) {

        return true//disable

      } else {
        this.TimeSlot = true;
        return false//not disabled

      }

    }
  }

  GetAllServiceTimeSlotsWithServiceId() {
    let obj = this.servicebooking.ServiceId;
    this.timeslotservice.GetAllServiceTimeSlotsWithServiceId(obj).subscribe((data: any) => {
      if (data.length > 0) {
        this.TimeList = data.filter(x => x.Status != 2);


        console.log(this.TimeList);

        if (this.servicebooking.ServiceType == 1) {
          this.servicebooking.ServiceTime = this.TimeList[0].StartTime;
          this.servicebooking.ServiceDate = this.dateSlotList[0].Date;
        }
      }
      else {
        this.TimeList = [];
      }
    })
  }


  submitAddress() {
    if (this.servicebooking.Address.length > 0) {
      if (this.servicebooking.ServiceType == 1)//for book now coded added by anu oct 05
      {
        this.isBankDetails = true;
      }
      else {
        this.GetAllServiceTimeSlotsWithServiceId();
        this.isAdress = false;
        this.isServiceBooking = false;
        this.isDateTime = true;
        this.isLogin = false
      }

    } else {
      this.alertservice.Alert('Please enter Address Details !!', 2, null, null,)
    }
  }



  Selectpayment(val) {
    this.servicebooking.PaymentType = val;
  }
  GotoBankDetails() {
    // this.isBankDetails=true;
    if (this.servicebooking.ServiceType == 2) {
      if ((this.servicebooking.ServiceDate.length > 0 && this.servicebooking.ServiceTime.length > 0)) {
        this.isBankDetails = true;
      }
      else {
        this.alertservice.Alert("Please select service date and time", 2, null, null);
      }

    }
    else {
      this.isBankDetails = true;
    }


  }
  Proceed() {
    if (localStorage.getItem('user')) {

      if (this.servicebooking.PaymentType > 0) {
        if (this.servicebooking.PaymentType == 1) {    //cash on delivery
          this.InsertServiceBooking()
        }
        else {                                      //online payment
          this.pay();
        }
      } else {
        alert('Please select payment Type!')
      }
    } else {
      alert('Please Login/Register to continue !')
      this.router.navigate(['login']);
    }
  }
  CloseBankDetails() {


    if (this.servicebooking.ServiceType == 1) {
      this.isBankDetails = false;
      this.isAdress = true;
    }
    else {
      this.isBankDetails = false;
      this.isDateTime = true;
    }


  }


  // convertdate(){
  //   DateTime dt = DateTime.Parse("6/22/2009 07:00:00 AM");
  //   dt.ToString("hh:mm tt");
  // }
  InsertServiceBooking() {


    this.servicebooking.UserName = JSON.parse(localStorage.getItem('user')).Name;
    this.servicebooking.Mobile = JSON.parse(localStorage.getItem('user')).Mobile;

    this.servicebooking.PaymentCode = this.PaymentId;
    if (this.servicebooking.ServiceType == 1)//for book now
    {
      if (this.servicebooking.ServiceDate.length <= 0) {
        this.servicebooking.ServiceDate = this.datepipe.transform(this.today, 'dd-MMM-yyyy')
      }

      if (this.servicebooking.ServiceTime.length <= 0) {
        this.servicebooking.ServiceTime = this.datepipe.transform(this.today, 'dd-MMM-yyyy HH:mm:ss a')
      }


    }

    if (this.servicebooking.ServiceName.length > 0) {
      this.servicebooking.UserId = JSON.parse(localStorage.getItem('user')).Id;
      debugger;
      this.serviceservice.InsertServiceBooking(this.servicebooking).subscribe((data: any) => {
        if (data) {
          if (data[0].Id > 0 && data[0].Error == 0) {
            // this.alertservice.Alert('Service Booked Succesfully!',1,null,null)
            this.isSuccess = true; this.isBankDetails = false;
            this.servicebooking = new ServiceBooking();
            setTimeout(() => {
              this.CloseBooking();
            }, 5000)
          }
          else {
            this.alertservice.Alert('Error while Service booking  !' + data[0].Error.toString(), 3, null, null);
            this.isFail = true;
          }
        } else {
          this.alertservice.Alert('Error while Service booking  !' + data[0].Error.toString(), 3, null, null);
          this.isFail = true;
        }
      })
    }
    else {
      alert('Please Enter Service Name !')
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
      amount: (Number(this.servicebooking.Amount)) * 100,
      name: 'BlueSky',
      prefill: {
        email: this.user.Email,
        contact: this.user.Mobile,
        name: this.user.Name
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


  async Login() {
    if (this.validationservice.ValidateMobile(this.username, false) ||
      this.validationservice.ValidateEmail(this.username, false)) {

      if (this.validationservice.IsEmail(this.username)) {
        this.user.Email = this.username;
        this.user.Mobile = '';
      }
      else if (this.validationservice.IsMobile(this.username)) {
        this.user.Mobile = this.username;
        this.user.Email = '';
      }
      let loading = await this.loadingCtrl.create({
        message: 'Please wait ........',
      });
      loading.present();
      this.userservice.LoginWithEmailOrMobile(this.user.Mobile, this.user.Email).subscribe((data) => {
        loading.dismiss();
        if (data) {
          if (data.Id > 0 && data.Error == 0) {
            this.user.Id = data.Id;
            this.IsLogin = false; this.IsOTP = true; this.IsRegister = false;
            //this.alertservice.Alert("Your OTP is "+data.Password , 1, null,null);
            this.alertservice.Alert('We have sent an OTP to your registered mobile number , Please enter and verify.OTP is ' + data.Password, 1, () => { }, () => { });
          }
          else {
            this.alertservice.Alert("Error while Login !" + data.Error, 3, null, null);
          }
        }
        else {
          this.alertservice.Alert("Error while Login !", 3, null, null);
        }
      });

    }
    else {
      this.alertservice.Alert("Please Enter Valid Mobile", 2, null, null);
    }
  }

  async OTPVerifications() {
    if (this.validationservice.ValidateValues(this.user.Password, "OTP", true)) {
      let loading = await this.loadingCtrl.create({
        message: 'Please wait ........',
      });
      loading.present();
      this.userservice.LoginWithOTP(this.user.Id, this.user.Password).subscribe((data) => {
        loading.dismiss();
        if (data) {
          if (data.length > 0) {
            this.user = data[0];
            localStorage.setItem("user", JSON.stringify(this.user));
            //this.GetAllOnlineCartDetails();
            if (this.user.Name.trim().length > 0) {
              if (localStorage.getItem("IsFromCart")) {
                localStorage.removeItem(("IsFromCart"));
                this.router.navigate(['checkout-details']);
              } else {
                this.router.navigate(['guest-user-home']);
              }
            }
            else {
              // this.user.Address=this.address;
              if (localStorage.getItem('UserPincode')) {
                this.user.Pincode = JSON.parse(localStorage.getItem('UserPincode'))
              } else {
                // this.user.Pincode=this.postcode;
              }
              this.user.Longitude = this.servicebooking.Latitude.toString();
              this.user.Latitude = this.servicebooking.Longitude.toString();
              this.IsLogin = false;
              this.IsOTP = false;
              this.IsRegister = true;

            }
            this.IsLogin = false;
            this.IsOTP = false;
            this.IsRegister = false;
            this.Toggle(1);
          }
          else {
            this.alertservice.Alert("Invalid OTP", 3, null, null);
          }
        }
      })

    }
  }


  async UpdateNameAndAddress() {
    if (this.validationservice.ValidateAddress(this.user.Address, true) &&
      this.validationservice.ValidateName(this.user.Name, true) &&
      this.validationservice.ValidateValues(this.user.Pincode, "Pincode", true)) {
      let loading = await this.loadingCtrl.create({
        message: 'Please wait ........',
      });
      loading.present();
      this.userservice.UpdateAddressAndName(this.user).subscribe((data) => {
        loading.dismiss();
        if (data) {
          if (data[0].Id > 0 && data[0].Error == 0) {
            this.servicebooking.Address = this.user.Address;
            localStorage.setItem("user", JSON.stringify(this.user));
            this.IsLogin = false;
            this.IsOTP = false;
            this.IsRegister = false;
            this.Toggle(1);
            if (localStorage.getItem("IsFromCart")) {
              localStorage.removeItem(("IsFromCart"));
              this.router.navigate(['checkout-details']);
            }
            else {
              this.router.navigate(['guest-user-home']);
            }

          }
          else {
            this.alertservice.Alert("Error While Update" + data[0].Error, 3, null, null);
          }
        }
        else {
          this.alertservice.Alert("Error While Update", 3, null, null);
        }
      })
    }

  }

  CloseLogin() {
    this.isAdress = false;
    this.isServiceBooking = true;
    this.isDateTime = false;
    this.isLogin = false;
  }

  async ResendOtp() {
    let loading = await this.loadingCtrl.create({ message: "Resending OTP...please wait..." });
    loading.present();
    this.userservice.ResendVerificationOtp(this.user.Id).subscribe(data => {
      loading.dismiss();
      if (data) {
        if (data.Id > 0) {
          //      this.alertservice.Alert("Your OTP is "+data.Password , 1, ()=>{}, ()=>{});
          this.alertservice.Alert('We have sent an OTP to your registered mobile number, Please enter and verify.OTP is ' + data.Password, 1, () => { }, () => { });
        } else {
          this.alertservice.Alert('Error while resending OTP', 3, null, null);
        }
      } else {
        this.alertservice.Alert('Error while resending OTP', 3, null, null);
      }
    })
  }


  OpenCalendar() {
    this.isCalendar = true;
  }

  // Inputchange(event){
  // this.dateSlotList.filter(x=>x.isActive==true)[0].isActive=false;
  // }

  Inputchange(event) {
    this.isCalendar = false;

    let todaysDate = this.datepipe.transform(this.today, 'yyyy-MM-dd')
    let BookingDate = this.datepipe.transform(this.servicebooking.ServiceDate, 'yyyy-MM-dd')



    if (BookingDate > todaysDate) {
      this.dateSlotList.filter(x => x.isActive == true)[0].isActive = false;
      this.caldate = this.datepipe.transform(this.servicebooking.ServiceDate, 'dd-MMM-yyyy')
      this.showdate = true;
      this.isShow=true;
    } else {
      this.alertservice.Alert('Please choose another Date  !!', 2, null, null,)

    }





    
  }

  ToggleCollapse(val) {
    this.ToggleCollapse = val;
  }

  GetRateChartList() {
    this.serviceservice.GetAllrateChartWihServiceId(this.servicebooking.ServiceId).subscribe((data: any) => {
      if (data.length > 0) {
        this.RateChartList = <Array<any>>data;
      }
      else {

        this.RateChartList = [];
      }
    })
  }

}
