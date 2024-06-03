import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MenuControlProvider } from '../Providers/menu-control/menu-control';
import { Users } from '../Class/users';
import { AlertService } from '../alert-info/alert-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConfig } from '../Class/AppConfig';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  MenuClass:string='sidebar-menu'
  user=new Users();
  IsEdit:boolean=false;
  IsUser:boolean=false;
  app=new AppConfig()
  @Output() UserChanged: EventEmitter<boolean> = new EventEmitter()
  constructor(public menuservice:MenuControlProvider,public alertservice:AlertService,
    public router:Router) {
    this.menuservice.menuEvent.subscribe((data) => {
      if (data) {
        if (data.MenuClass) {
          this.MenuClass = data.MenuClass;
          if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.IsUser=true;
          }
          else
          {
            this.IsUser=false;
          }
        }
           }
    })
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  
  }
  GotoAboutUs()
  {
    this.router.navigate(['about-us'])
  }

  GotoTerms()
  {
    this.router.navigate(['terms-and-condition'])
  }
  GotoPrivacy()
  {
    this.router.navigate(['privacy-and-policy'])
  }
  GotoFaq()
  {
    this.router.navigate(['faq'])
  }
  GotoContactUs()
  {
    this.router.navigate(['contactus'])
  }
  GotoUser(item)
  {
    let navigationExtras:NavigationExtras={
      state:{
        User:item
      } 
    }
    this.router.navigate(['user-details'],navigationExtras);
  }
  closeMenu()
{
  
  this.menuservice.menuEvent.emit({ MenuClass: 'sidebar-menu' });
}

ionViewDidEnter () {
  if (localStorage.getItem('user')) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}


Logout() {
  let that = this
  this.alertservice.Alert('Are you sure you want to leave?', 4, function () {
    if(localStorage.getItem('UserPincode'))
    {
      // let pincode=JSON.parse(localStorage.getItem('UserPincode'))
      localStorage.clear();
      // localStorage.setItem('UserPincode',pincode);
    }
    else
    {
      localStorage.clear();
    }
    that.IsUser=false;
    that.UserChanged.emit(false);
    that.closeMenu();
  }, function () {

  })


}


GotoHome()
{
  this.closeMenu();
  this.router.navigate(['guest-user-home']);
}
GotoHistory()
{
  this.router.navigate(['booking-history']);
 
}

GotoLogin()
{
  this.closeMenu();
  this.router.navigate(['login']);
}

GotoPrivacyAndPolicy()
{
  this.closeMenu();
  this.router.navigate(['privacy-and-policy'])
}

GotoRefundPolicy()
{
  this.closeMenu();
  this.router.navigate(['refund-policy'])
}

GotoTermsAndConditions()
{
  this.closeMenu();
  this.router.navigate(['terms-and-condition'])
}


}
