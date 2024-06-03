import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ValidationProvider } from '../Providers/validation';
import { AlertService } from '../alert-info/alert-service.service';
import { LoginService } from '../Providers/login.service';
import { LoadingController } from '@ionic/angular';
import { Users } from '../Class/users';
import { AppConfig } from '../Class/AppConfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  appconfig=new AppConfig();
   user=new Users();
  IsLogin:boolean=true;
  IsOTP:boolean=false;
  IsRegister:boolean=false;
  username:string="";
  address:string="";
  postcode:string="";
  locationdata:any;
  // cart=new Cart();
 
  constructor(private geolocation: Geolocation,public router:Router,private validationservice:ValidationProvider,
    private alertservice: AlertService,private userservice:LoginService,public loadingCtrl:LoadingController) { }

  ngOnInit() {
  }

  Toogle(value)
  {
      if(value==1)  //login section
      {
        this.IsLogin=true;
        this.IsOTP=false;
        this.IsRegister=false;
      }
      else if(value==2) //register section
      {
  
      this.IsLogin=false;
      this.IsOTP=false;
      this.IsRegister=true;
      }
      else if(value==3)  //otp section
      {       
        this.IsLogin=false;
        this.IsOTP=true;
        this.IsRegister=false;
      }
 
  }


  getAddress(): any {
    let that: any;
      this.geolocation.getCurrentPosition().then((position) => {
        this.userservice.getGoogleAddress(position.coords.latitude.toString(), position.coords.longitude.toString())
          .subscribe(data => {
            if (data && !!data.results[0] && data.results.length > 0) {
              if(position){
                this.locationdata=position;
                console.log(this.locationdata);
                
                localStorage.setItem("UserLocation",JSON.stringify({latitude:position.coords.latitude,longitude:position.coords.longitude}));
              }
              this.user.Address = data.results[0].formatted_address;
              this.address=data.results[0].formatted_address;
              let picodeobj = data.results[0].address_components.find(s => s.types.find(q => q == 'postal_code'));
              if(!!picodeobj)
              {
                this.user.Pincode=picodeobj.short_name;
                this.postcode=picodeobj.short_name;
                // localStorage.setItem("UserPincode",JSON.stringify(picodeobj.short_name))
              }
              
              
            }
          }); 
      });
    

  }

  ionViewWillEnter()
  {
 
    this.getAddress();

    // if(localStorage.getItem('user'))
    // {
    //   this.router.navigate(['guest-user-home']);
    // }
  
  };  


 async Login()
  {
    if(this.validationservice.ValidateMobile(this.username,false) || 
    this.validationservice.ValidateEmail(this.username,false) )
    {
     
      if(this.validationservice.IsEmail(this.username))
      {
        this.user.Email=this.username;
        this.user.Mobile='';
      }
      else if(this.validationservice.IsMobile(this.username))
      {
        this.user.Mobile=this.username;
        this.user.Email='';
      }
      let loading = await this.loadingCtrl.create({
        message: 'Please wait ........',
      });
      loading.present();
      this.userservice.LoginWithEmailOrMobile(this.user.Mobile,this.user.Email).subscribe((data)=>{
        loading.dismiss();
        if(data)
        {
          if(data.Id>0 && data.Error==0)
          {
            this.user.Id=data.Id;
           
         //  this.alertservice.Alert("Your OTP is "+data.Password , 1, null,null);
         this.alertservice.Alert('We have sent an OTP to your registered mobile number, Please enter and verify.Your OTP is '+ data.Password , 1, ()=>{}, ()=>{});

           setTimeout(() => {
            this.Toogle(3);

            }, 3000)
         //  this.alertservice.Alert('We have sent an OTP to your registered mobile number/Email, Please enter and verify', 1, ()=>{}, ()=>{});
          }
          else
          {
            this.alertservice.Alert("Error while Login !" + data.Error, 3, null, null);
          }
        }
        else
        {
          this.alertservice.Alert("Error while Login !" , 3, null, null);
        }
      });
      
    }
    else
    {
      this.alertservice.Alert("Please Enter Valid Mobile" , 2, null, null);
    }
  }

  async OTPVerifications()
  {
    if(this.validationservice.ValidateValues(this.user.Password,"OTP",true))
    {
      let loading = await this.loadingCtrl.create({
        message: 'Please wait ........',
      });
      loading.present();
      this.userservice.LoginWithOTP(this.user.Id,this.user.Password).subscribe((data)=>{
        loading.dismiss();
        if(data)
        {
          if(data.length>0)
          {
            this.user=data[0];
            localStorage.setItem("user",JSON.stringify(this.user));
            //this.GetAllOnlineCartDetails();
          
            if(this.user.Name.trim().length>0 )
            {
              if(localStorage.getItem("IsFromCart"))
              {
                localStorage.removeItem(("IsFromCart"));
                this.router.navigate(['checkout-details']);
              }else
              {
                this.router.navigate(['guest-user-home']);
              }
           
          
            }
            else
            {
             this.user.Address=this.address;
             if(localStorage.getItem('UserPincode')){
               this.user.Pincode=JSON.parse(localStorage.getItem('UserPincode'))
             }else{
              this.user.Pincode=this.postcode;
             }
             if(!!this.locationdata)
             {
              
              this.user.Longitude=this.locationdata.coords.longitude.toString();
              this.user.Latitude=this.locationdata.coords.latitude.toString();
             }
              this.Toogle(2);
            }
          }
          else
          {
            this.alertservice.Alert("Invalid OTP" , 3, null, null);
          }
        }
      })

    }
  }

  HidePincode(){
    if(localStorage.getItem('UserPincode')){
      return true;
    }else{
     return false;
    }
  }


  // GetAllOnlineCartDetails() {
  //   if (localStorage.getItem("OnlineCartList")) {
  //     if (JSON.parse(localStorage.getItem("OnlineCartList")).length > 0) {
  //       let CartList: any = JSON.parse(localStorage.getItem("OnlineCartList"))
  //       for (let i = 0; i < CartList.length; i++) {
  //         this.cart = CartList[i];
  //         this.cart.UserId = JSON.parse(localStorage.getItem('user')).Id;
  //         this.itemprovider.InsertCart(this.cart).subscribe(data => {
  //           if (data) {
  //             localStorage.removeItem('OnlineCartList');
  //             this.commonService.getCartCount();
  //           }
  //         })
  //       }
  //     }
  //   }
  // }


  async ResendOtp() {
    let loading = await this.loadingCtrl.create({ message: "Resending OTP...please wait..." });
    loading.present();
    this.userservice.ResendVerificationOtp(this.user.Id).subscribe(data => {
      loading.dismiss();
      if (data) {
        if (data.Id > 0) {
         // this.alertservice.Alert("Your OTP is "+data.Password , 1, ()=>{}, ()=>{});
           this.alertservice.Alert('We have sent an OTP to your registered mobile number, Please enter and verify.Your OTP is ' + data.Password, 1, ()=>{}, ()=>{});
        } else {
          this.alertservice.Alert('Error while resending OTP', 3, null, null);
        }
      } else {
        this.alertservice.Alert('Error while resending OTP', 3, null, null);
      }
    })
  }

 async UpdateNameAndAddress()
 {
   if(this.validationservice.ValidateAddress(this.user.Address,true) && 
   this.validationservice.ValidateName(this.user.Name,true) && 
   this.validationservice.ValidateValues(this.user.Pincode,"Pincode",true) )
   {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait ........',
    });
    loading.present();
    this.userservice.UpdateAddressAndName(this.user).subscribe((data)=>{
      loading.dismiss();
      if(data)
      {
        if (data[0].Id>0 && data[0].Error==0)
        {
          localStorage.setItem("user",JSON.stringify(this.user));
          if(localStorage.getItem("IsFromCart"))
          {
            localStorage.removeItem(("IsFromCart"));
            this.router.navigate(['checkout-details']);
          }
          else
          {
            this.router.navigate(['guest-user-home']);
          }
         
        }
        else
        {
          this.alertservice.Alert("Error While Update"+data[0].Error , 3, null, null);
        }
      }
      else
      {
        this.alertservice.Alert("Error While Update" , 3, null, null);
      }
    })
   }

 }


 GotoHome()
 {
  this.router.navigate(['guest-user-home']);
 }

}
