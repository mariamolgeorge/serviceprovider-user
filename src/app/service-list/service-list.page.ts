import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Providers/services.service';
import { Router, NavigationExtras } from '@angular/router';
import { Services } from '../Class/services';
import { AppConfig } from '../Class/AppConfig';


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.page.html',
  styleUrls: ['./service-list.page.scss'],
})
export class ServiceListPage implements OnInit {
  ServicesList:any[]=[];
  ServicesListFilter:any[]=[];
  service=new Services();
  CategoryList:any[]=[];
  appconfig=new AppConfig();
  constructor(public servicesservice:ServicesService,public router:Router) { }

  ngOnInit() {
    this.GetAllServices();
    this.GetAllCategory();
  }


  GetAllCategory(){
    let pincode=JSON.parse(localStorage.getItem('UserPincode'));
    this.servicesservice.GetAllCategoryWithPincode(pincode).subscribe((data:any)=>{
      if(data.length>0){
      this.CategoryList=<Array<any>>data;
      }
    })
  }



  GetAllServices(){
    this.servicesservice.GetAllServices().subscribe((data:any)=>{
      if(data.length>0){
        this.ServicesList=<Array<any>>data;
        this.ServicesListFilter=this.ServicesList;
      }
      else{
        this.ServicesList=[];
        this.ServicesListFilter=[];
      }
    })
  }


  back(){
    this.router.navigate(['guest-user-home'])
  }


  openItemDetails(item){
    this.service=item;
    let navigationextra:NavigationExtras={
      state:{
        Item: this.service
      }
    }
    this.router.navigate(['service-details'],navigationextra)
  }
  

  handleDisplayImgError(ev: any) {
    let source = ev.srcElement;
    let imgSrc = this.appconfig.AssetUrl + "/assets/img/service.png";
    source.src = imgSrc;
  
  }


  GetList(Id){
    return this.ServicesListFilter.filter(x=>x.CategoryId==Id);
  }
}
