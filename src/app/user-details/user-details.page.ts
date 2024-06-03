import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from '../alert-info/alert-service.service';
import { Users } from '../Class/users';
import { LoginService } from '../Providers/login.service';
import { ValidationProvider } from '../Providers/validation';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
user=new Users()
  constructor(  public activatedRoute: ActivatedRoute,private router:Router,
    private validationservice:ValidationProvider,
    private alertservice: AlertService,private userservice:LoginService,public loadingCtrl:LoadingController) {


    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.user=this.router.getCurrentNavigation().extras.state.User;
        console.log(this.user);
        

      }
    })
   }

  ngOnInit() {
  }
  back()
  {
    this.router.navigate(['guest-user-home'])
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
}
