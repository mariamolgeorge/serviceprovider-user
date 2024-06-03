import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersServiceProviderService } from '../Providers/users-service-provider.service';
import { CityServiceMapingService } from '../Providers/city-service-maping.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../Providers/services.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationService } from '../Providers/geolocation.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform, IonSlides } from '@ionic/angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NavigationExtras } from '@angular/router';
import { AppConfig } from '../Class/AppConfig';
import { MenuControlProvider } from '../Providers/menu-control/menu-control';
import { Users } from '../Class/users';
import { Services } from '../Class/services';
import { ServiceBooking } from '../Class/ServiceBooking';
import { UserAnnouncementService } from '../Providers/user-announcement.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-guest-user-home',
  templateUrl: './guest-user-home.page.html',
  styleUrls: ['./guest-user-home.page.scss'],
})
export class GuestUserHomePage implements OnInit {

 ServicesGroupList:any[]=[];
  ServicesList:any[]=[];
  ServicesGroupListFilter:any[]=[];
  obj:any[]=[];
  CityList:any[]=[];
  cityid: any;
  CityName: any;
  PincodePopupIsOpen = false;
  Pincode: string = "";

  //user = new Users();
  IsLoaded: boolean = false;
  appconfig=new AppConfig();
  ArticleList:any[]=[];
  VideoList :any[]=[];
  ImageList :any[]=[];
  BannerList :any[]=[];
  isUser:boolean=false;
  user=new Users();
  GroupList:any[]=[];
  Top12Services:any[]=[];
  Top6Services:any[]=[];
  IsViewMore:boolean=false;
  isItem:boolean=false;
  service=new Services()
  isBooking:boolean=false;
  servicebooking=new ServiceBooking();
  carosalValue: number = 0;
  timeInterval: number = 1000;
  isVisible:boolean=false;

  // added by praveesh 24/1/22
  LocationList:any[]=[];
  LocationListFilter:any[]=[];
  LocName:string="";
  // added by praveesh 24/1/22


  name:string="View More";
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  @ViewChild('slickModal1') slickModal1: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  @ViewChild('slickModal4') slickModal4: SlickCarouselComponent;

  constructor(private usersserviceprovider:UsersServiceProviderService,private geolocation: Geolocation,
    private cityservicemaping:CityServiceMapingService,public serviceproviderservice:ServicesService,
    private router:Router,private activatedRoute:ActivatedRoute,private googleaddress: GeolocationService,
    public platform: Platform,private androidPermissions: AndroidPermissions,
    private userannounceservice:UserAnnouncementService,
    private locationAccuracy: LocationAccuracy,public menuservice:MenuControlProvider
    ) { 
      this.getLocations();
      if (localStorage.getItem('LocationName')) {
        this.LocName = JSON.parse(localStorage.getItem('LocationName'));
      }
     
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
        if(this.user.Id>0 && this.LocName.toString().length==0)
        {
          this.PincodePopupIsOpen = true;
        }
    }

  ngOnInit() {
    
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.checkGPSPermission();
      }
      else {
        this.getAddress();
      }
    });

    if(localStorage.getItem('user')){
      this.isUser=true;
      
    }
  }


  ionViewWillEnter(){
    this.GetAllAnnouncement();
    this.Changecarosal();
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      //this.Pincode=this.user.Pincode;
    }
    if (localStorage.getItem('LocationName')) {
      this.LocName = JSON.parse(localStorage.getItem('LocationName'));
     
    }
    if(this.user.Id>0 && this.LocName.toString().length==0)
    {
      this.PincodePopupIsOpen = true;
    }
    if(this.user.Id==0)
    {
      this.PincodePopupIsOpen = true;
    }
    this.getAddress();
  }


  ngAfterViewInit(){

    jQuery("document").ready(function ($) {
      var nav = $('.header-wrapper');
            $('#home').scroll(function () {
                if ($(this).scrollTop() > 140) {
                    nav.addClass("f-nav");
                } else {
                    nav.removeClass("f-nav");
                }
            });


    
    })
    // .ArticleSlick();
    this.VideoSlick();

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
  Changecarosal() {
    setTimeout(() => {
      this.carosalValue = this.BannerList['length'] - 1 == this.carosalValue ? 0 : this.carosalValue + 1;
      this.Changecarosal();
    }, this.timeInterval);

    return true;

  }
  
  option={
    slidesPerView:4,
    centeredSlides:true,
    loop:true,
    spaceBetween:10,
    // autoPlay:true,
  }
  articleoptions={
    slidesPerView:2.5,
    centeredSlides:true,
    loop:true,
    spaceBetween:10,

  }

   
GetAllAnnouncement() {

  this.ArticleList.length = 0;
  this.ArticleList = [];
  this.BannerList=[];
  this.ImageList=[];
  this.VideoList=[];
  // this.slickModal.unslick();
  // this.slickModal1.unslick();
  
  this.userannounceservice.GetAllAnnouncementsUserSide().subscribe((data: any) => {
    if (data.length > 0) {
      
      this.ArticleList = data.filter(x => x.Type == 1 && x.Status == 0);
      this.VideoList = data.filter(x => x.Type == 2 && x.Status == 0);
      this.ImageList = data.filter(x => x.Type == 3 && x.Status == 0);
      this.BannerList = data.filter(x => x.Type == 4 && x.Status == 0);
      // console.log(this.VideoList);
      // console.log(this.ArticleList);
      console.log(this.ImageList)
    }
  })
}
slickInitImages(e){
  console.log('Video slick initialized');
}

GetAllAnnouncementsWithType(type){

  this.userannounceservice.GetAllAnnouncementsWithType(type).subscribe((data:any)=>{
    if(data.length>0){
      this.GroupList=<Array<any>>data;
    }
    else{
      this.GroupList=[];
    }
  })

}


  //ArticleSlick(){
   // $(document).ready(function () {
   //   setTimeout(() => {
  //       $('.articles-div').slick({
  //         centerMode: false,
  //         centerPadding: '0px',
  //         slidesToShow: 3,
  //         arrows: false,
  //         dots: true,
  //         infinite: true,
  //         responsive: [
  //             {
  //                 breakpoint: 800,
  //                 settings: {
  //                     arrows: false,
  //                     centerMode: true,
  //                     centerPadding: '0px',
  //                     slidesToShow: 2
  //                 }
  //             },
  //             {
  //                 breakpoint: 480,
  //                 settings: {
  //                     arrows: false,
  //                     centerMode: true,
  //                     centerPadding: '0px',
  //                     slidesToShow: 1
  //                 }
  //             }
  //         ]
  //     });
  //     }, 1000);
  //   });
  // }

  VideoSlick(){
    $(document).ready(function () {
      setTimeout(() => {
        $('.trending-videos').slick({
          centerMode: false,
          centerPadding: '0px',
          slidesToShow: 4,
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2500,
          responsive: [
              {
                  breakpoint: 800,
                  settings: {
                      arrows: false,
                      centerMode: true,
                      centerPadding: '0px',
                      slidesToShow: 2
                  }
              },
              {
                  breakpoint: 480,
                  settings: {
                      arrows: false,
                      centerMode: true,
                      centerPadding: '0px',
                      slidesToShow: 1
                  }
              }
          ]
      });


      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          $('.articles-div').slick('setPosition');
      })



      }, 1000);
    });
  }

  getAddress(): any {
    
    let that: any;
   
    this.geolocation.getCurrentPosition().then((position) => {
     
      this.googleaddress.getGoogleAddress(position.coords.latitude.toString(), position.coords.longitude.toString())
        .subscribe(data => {

          if (data && !!data.results[0] && data.results.length > 0) {
            let picodeobj = data.results[0].address_components.find(s => s.types.find(q => q == 'postal_code'));
            if (!!picodeobj) {
              this.Pincode = picodeobj.short_name;
            }
            if (localStorage.getItem('UserPincode')) {
              this.Pincode = JSON.parse(localStorage.getItem('UserPincode'));
              if (this.Pincode.toString().length == 6) {
                this.PincodePopupIsOpen = false;
                this.GetTop12ServicesWihPincode();
                this.GetAllServicesWithPincode();
                
              } else {
                this.PincodePopupIsOpen = true;
              }
            } else {
              this.PincodePopupIsOpen = true;
            }
          }
        });
    });
    //}

  }


  GetAllServicesWithPincode() {
    
    if (localStorage.getItem('UserPincode')) {
      let pincode = JSON.parse(localStorage.getItem('UserPincode'));
      this.serviceproviderservice.GetAllServicesWithPincode(pincode).subscribe((data:any) => {
        if (data.length > 0) {
          this. ServicesGroupList = <Array<any>>data;
          this. ServicesGroupListFilter = this. ServicesGroupList;
          this.IsLoaded = true;
        } else {

          this. ServicesGroupList = [];
          this. ServicesGroupListFilter = [];
          this.IsLoaded = true;
        }
      })
    }

  }
  


  GetTop12ServicesWihPincode(){
    if (localStorage.getItem('UserPincode')) {
      let pincode = JSON.parse(localStorage.getItem('UserPincode'));
      this.serviceproviderservice.GetTop12ServicesWithPincode(pincode).subscribe((data:any) => {
        if (data.length > 0) {
          this.Top12Services = <Array<any>>data;
          console.log(this.Top12Services);
          
          this.Top6Services=[];
          for(let i=0;i<6;i++){
            this.Top6Services.push( this.Top12Services[i]);
          }
         
          this.IsLoaded = true;
        } else {
          this.Top12Services = [];
          this.IsLoaded = true;
        }
      })
    }
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
      //  alert(err);
      }
    );
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getAddress();
      },
      error => {
     //   alert('Error requesting location permissions ' + JSON.stringify(error))
      }
     
    );
  }
  SetPincode(location) {
    console.log(location);
    // if (this.Pincode.toString().length == 6) {
    //   localStorage.setItem("UserPincode", JSON.stringify(this.Pincode))
    //   this.PincodePopupIsOpen = false;
    //   this.GetTop12ServicesWihPincode();
    //   this.GetAllServicesWithPincode()
   
    // }

    this.Pincode = location.PincodeStarts;
    this.LocName=location.Name;
    console.log(this.Pincode);
    
    // if (this.Pincode.toString().length == 6) {
      if (this.Pincode.length == 6) {
       
      localStorage.setItem("UserPincode", JSON.stringify(this.Pincode))
      localStorage.setItem("LocationName", JSON.stringify(this.LocName)); 
      this.PincodePopupIsOpen = false;
      this.GetTop12ServicesWihPincode();
      this.GetAllServicesWithPincode()
      }

  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
             // alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }


  OpenPincodePopup() {
    this.PincodePopupIsOpen = true;
    this.IsLoaded = false;
    this.isBooking=false;
  }


NavigateToCitySelection(){
  this.router.navigate(['city-selection'])
}
navigate()
{
  this.router.navigate(['service-list'])

}
openItemDetails(item){
  console.log(item);
  
  this.service=new Services();
  this.service=item;
  //commented by anu oct 23-10-2021
  this.servicebooking=new ServiceBooking();
  
  //commented by anu oct 23-10-2021
    this.servicebooking.ServiceId=this.service.Id;
    this.servicebooking.ServiceName=this.service.Name;
    this.servicebooking.SupervisorId=this.service.SupervisorId;
    this.servicebooking.Amount=this.service.AdvanceAmount; 
    this.servicebooking.LocationId=this.service.LocationId;
    this.servicebooking.ServiceDescription=this.service.Description;
    this.servicebooking.ServiceType=2;
    this.servicebooking.PaymentType=1;
    this.isBooking=true;
    
  // this.obj=item;
  // let navigationextra:NavigationExtras={
  //   state:{
  //     Item: this.obj
  //   }
  // }
  // this.router.navigate(['service-details'],navigationextra)
}


handleDisplayImgError(ev: any) {
  let source = ev.srcElement;
  let imgSrc = this.appconfig.AssetUrl + "/assets/img/service.png";
  source.src = imgSrc;

}


LeftMenuBtnClick(){
  this.menuservice.menuEvent.emit({ MenuClass: 'sidebar-menu view-sidebar' });
}

UserChangedHandler(data)
{
  if (localStorage.getItem('user')) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  else
  {
    this.user=new Users();
  }
}


ToggleViewMore(){
  if(this.IsViewMore==false){
    this.IsViewMore=true;
  }else{
    this.IsViewMore=false;
  }
}


ToggleItem(event){
  if(event==false){
    this.isItem=false;
    this.service=new Services()
  }else{
    
    this.servicebooking=new ServiceBooking();
    this.servicebooking.ServiceId=this.service.Id;
    this.servicebooking.ServiceName=this.service.Name;
    this.servicebooking.SupervisorId=this.service.SupervisorId;
    this.servicebooking.Amount=this.service.AdvanceAmount; 
    this.servicebooking.LocationId=this.service.LocationId;
    this.servicebooking.ServiceType=2;
    this.servicebooking.PaymentType=1;
    this.isBooking=true;
  }
 
}

ToggleBooking(event){
  if(event==false){
    this.isBooking=false;
    this.servicebooking=new ServiceBooking();
  }

}
// code article slick
GetAritcleConfig() {
  
  if (this.ArticleList.length == 1) {
    let slideConfigForArticles = {
      centerMode: false,
      centerPadding: '0px',
      slidesToShow: 1,
      arrows: false,

      dots: true,
      infinite: true,
      // autoplay: true,
      // autoplaySpeed: 2500,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        }
      ]
    }
    return slideConfigForArticles;
  }
  else if (this.ArticleList.length == 2) {
    let slideConfigForArticles = {
      centerMode: false,
      centerPadding: '0px',
      slidesToShow: 2,
      arrows: false,

      dots: true,
      infinite: true,
      // autoplay: true,
      // autoplaySpeed: 2500,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        }
      ]
    }
    return slideConfigForArticles;
  }
  else if (this.ArticleList.length == 3) {
    let slideConfigForArticles = {
      centerMode: false,
      centerPadding: '0px',
      slidesToShow: 3,
      arrows: false,

      dots: true,
      infinite: true,
      // autoplay: true,
      // autoplaySpeed: 2500,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        }
      ]
    }
    return slideConfigForArticles;
  }
  else {
    
  
    let slideConfigForArticles = {
      
      // centerMode: false,
      // centerPadding: '0px',
      // slidesToShow: 3,
      // arrows: false,

      dots: true,
      // infinite: true,

      
      // autoplay: true,
      // autoplaySpeed: 2500,
      responsive: [
        {
          breakpoint: 2000,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1900,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1700,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1600,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1500,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1300,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1100,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1000,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 900,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 700,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        }
      ],
     
    }
    return slideConfigForArticles;
  }
  
}

// trackById(index: number, article: any): string {

//   return article.Id;

// }
trackByIdForVideos(index: number, videos: any): string {

  return videos.GroupId;

}

slickInit(e) {


  console.log('slick initialized');
}

trackById(index: number, article: any): string {

  return article.Id;

}
//end of code

//slick imageconfig
GetImageConfig() {

  if (this.ImageList.length == 1) {
    let slideConfigForArticles = {
      centerMode: false,
      centerPadding: '0px',
      slidesToShow: 1,
      arrows: false,

      //dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2500,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        }
      ]
    }
    return slideConfigForArticles;
  }
  else if (this.ImageList.length == 2) {
    let slideConfigForArticles = {
      centerMode: false,
      centerPadding: '0px',
      slidesToShow: 2,
      arrows: false,

      //dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2500,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        }
      ]
    }
    return slideConfigForArticles;
  }
  else if (this.ImageList.length == 3) {
    let slideConfigForArticles = {
      centerMode: false,
      centerPadding: '0px',
      slidesToShow: 3,
      arrows: false,

      //dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2500,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        }
      ]
    }
    return slideConfigForArticles;
  }
  else {
    let slideConfigForArticles = {
      // centerMode: false,
      // centerPadding: '0px',
      // slidesToShow:3,
      // arrows: false,

      //dots: true,
      // infinite: true,
      // autoplay: true,
      // autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 2000,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1900,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1700,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1600,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1500,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1300,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 5
          }
        },
         {
          breakpoint: 1200,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1100,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 5
          }
        },
         {
          breakpoint: 1000,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 900,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
         {
          breakpoint: 700,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 400,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        }
      ]
    }
    return slideConfigForArticles;
  }
  
}

NextBanner() {
  this.carosalValue = this.BannerList['length'] - 1 == this.carosalValue ? 0 : this.carosalValue + 1;
}

PreviousBanner() {
  this.carosalValue = this.carosalValue == 0 ? this.BannerList['length'] - 1 : this.carosalValue - 1;
}


///end image

// added by praveesh 24/1/22
getLocations()
{
  this.usersserviceprovider.GetAllLocations().subscribe((data:any)=>{
    if(data.length>0){
      this.LocationList=<Array<any>>data;
      this.LocationListFilter=this.LocationList
      console.log("loca",this.LocationList);
      
    }
    else{
      this.LocationList=[];
      this.LocationListFilter=[];
    }
  })
}
SearchItem(ev) {
  const val = ev.target.value;
  // console.log("value",val);
  
  if (val && val.trim() != '') {
    this.LocationListFilter= this.LocationList.filter((item) => {
      return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1
      );
      
    })
  }
  else{
    this.LocationListFilter=this.LocationList;
  }

}
closemodel()
{
  this.PincodePopupIsOpen = false;
}


OpenWatsapp(mobile) {
  
if(this.appconfig.isApp==0){
  
    let url: string = "https://api.whatsapp.com/send?phone=+91" + mobile + "&text=%20+";
  window.open(url, '_blank');
}
else{
 
  let url: string = "whatsapp://send?phone=+91" + mobile; 
  window.location.href=url;
}

  //  let url: string = "https://wa.me/+919746259902/?text=%20+";
  // window.open(url, '_blank');
  // href="https://wa.me/whatsappphonenumber/?text=urlencodedtext"
}

// added by praveesh 24/1/22

}
