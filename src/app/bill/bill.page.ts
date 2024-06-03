import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { CallAssignService } from '../Providers/call-assign.service';
//import { ServicesService } from '../Providers/services.service';
import { AppConfig } from '../Class/AppConfig';
import { NavController } from '@ionic/angular';
import domtoimage from 'dom-to-image-more';
import jspdf from 'jspdf';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ServicesService } from '../Providers/services.service';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {
  showshare:boolean=false;
  @ViewChild('print_div', { read: ElementRef}) element: ElementRef;
  viewMe?: ElementRef<HTMLElement>; 
  IsPrint:boolean=false;
  sid:number=0;
  RateChartList:any[]=[];
  callAssignDetailList:any[]=[];
  bill:any;
  ServiceHour:string='';
   Amount:number=0;
   TotalAmount:number=0;
   SGSTAmount:number=0;
   CGSTAmount:number=0;
   CessAmount:number=0;
   RemainingHour:number=0;
   AdditionalRate:number=0;
   appconfig=new AppConfig();
   myAngularxQrCode: any;
  constructor(private route: ActivatedRoute,
    private serviceservice:ServicesService,public navCtrl:NavController,private socialSharing:SocialSharing)
     {
      this.route.params.subscribe(params=>{ //code added by praveesh 18/12/21 qrcode 
        this.myAngularxQrCode=params.id
      })
      }

    ngOnInit() {
      if(window.innerWidth < 1000)
      {
        this.showshare=false;
      }
      this.route.params.subscribe(params => {
        this.sid = +params['id']; // (+) converts string 'id' to a number
        this.GetAllBillDetails();
       
      });
    }
  
    GetAllBillDetails(){
      this.serviceservice.GetAllBillDetailsWithBookingId(this.sid).subscribe((data:any)=>{
        if(data){
          this.bill=data[0];
         
          let hr=Math.floor(this.bill.ServiceHours/60);
          let mint=this.bill.ServiceHours%60;
          this.ServiceHour= hr.toString()+':'+mint.toString();
          this.GetRateChart();
        }
      })
    }
  
    GetRateChart(){
      this.serviceservice.GetAllrateChartWihServiceId(this.bill.ServiceId).subscribe((data:any)=>{
        if(data.length>0){
          this.RateChartList=<Array<any>>data;
          this.AdditionalRate=this.RateChartList[0].AdditionalRate;
  
         for(let i=0;i<this.RateChartList.length;i++){
           this.RateChartList[i].ServiceHours=Number(this.RateChartList[i].ServiceHours.split(':')[0])*60+Number(this.RateChartList[i].ServiceHours.split(':')[1]);
         }
  
         for(let i=0;i<this.RateChartList.length;i++){
           if(this.bill.ServiceHours<=this.RateChartList[i].ServiceHours){
              this.Amount=this.RateChartList[i].Amount;
              break;
           }
         }
         
         if(this.Amount==0){
          this.RateChartList=this.RateChartList.filter(x=>x.ServiceHours<=this.bill.ServiceHours);
          if(this.RateChartList.length>0){
                let max = 0;
                this.RateChartList.forEach(x => {
                if (x.ServiceHours> max) {
                max = x.ServiceHours;
                this.Amount=x.Amount;
                this.RemainingHour=(this.bill.ServiceHours)-x.ServiceHours;
             }
             });
             this.Amount=this.Amount+(this.RemainingHour/60)*this.AdditionalRate;
               }
         }
         
      //    this.RateChartList=this.RateChartList.filter(x=>x.ServiceHours<=this.bill.ServiceHours);
      //    console.log( this.RateChartList);
      //    if(this.RateChartList.length>0){
      //     let max = 0;
      //     this.RateChartList.forEach(x => {
      //     if (x.ServiceHours> max) {
      //     max = x.ServiceHours;
      //     this.Amount=x.Amount;
      //     this.RemainingHour=(this.bill.ServiceHours)-x.ServiceHours;
      //  }
      //  });
      //    }else{
      //     this.Amount=0;
      //     this.RemainingHour=this.bill.ServiceHours;
      //    }
         
      // console.log(this.RemainingHour);
      //   this.Amount=this.Amount+(this.RemainingHour/60)*this.AdditionalRate;
  
        this.TotalAmount=this.Amount+this.bill.AdditionalAmount;
          this.SGSTAmount=this.TotalAmount*0.09;
           this.CGSTAmount=this.TotalAmount*0.09;
              this.CessAmount=this.TotalAmount*0.01;
              this.UpdateBillAmount(this.TotalAmount+this.SGSTAmount+this.CGSTAmount);
        }else{
          this.RateChartList=[];
        }
      })
    }
  
    // GetRateChart(){
    //   this.serviceservice.GetAllrateChartWihServiceId(this.bill.ServiceId).subscribe((data:any)=>{
    //     if(data.length>0){
    //       this.RateChartList=<Array<any>>data;
    //       this.AdditionalRate=this.RateChartList[0].AdditionalRate;
    //      for(let i=0;i<this.RateChartList.length;i++){
    //        this.RateChartList[i].ServiceHours=Number(this.RateChartList[i].ServiceHours.split(':')[0])*60+Number(this.RateChartList[i].ServiceHours.split(':')[1]);
    //      }
    //      this.RateChartList=this.RateChartList.filter(x=>x.ServiceHours<=this.bill.ServiceHours);
    //      console.log( this.RateChartList);
    //      if(this.RateChartList.length>0){
    //       let max = 0;
    //       this.RateChartList.forEach(x => {
    //       if (x.ServiceHours> max) {
    //       max = x.ServiceHours;
    //       this.Amount=x.Amount;
    //       this.RemainingHour=(this.bill.ServiceHours)-x.ServiceHours;
    //    }
    //    });
    //      }else{
    //       this.Amount=0;
    //       this.RemainingHour=this.bill.ServiceHours;
    //      }
         
    //   console.log(this.RemainingHour);
    //     this.Amount=this.Amount+(this.RemainingHour/60)*this.AdditionalRate;
    //      this.TotalAmount=this.Amount+this.bill.AdditionalAmount;
    //        this.SGSTAmount=this.TotalAmount*0.09;
    //         this.CGSTAmount=this.TotalAmount*0.09;
    //          this.CessAmount=this.TotalAmount*0.01;
    //          this.UpdateBillAmount(this.TotalAmount+this.SGSTAmount+this.CGSTAmount+this.CessAmount);
    //     }else{
    //       this.RateChartList=[];
    //     }
    //   })
    // }
  
    
  
   
    Print() { 
      this.IsPrint=true; 
      setTimeout(()=>{
          var printContent = document.getElementById('print_div');
      let that=this;
      domtoimage.toCanvas(printContent) 
        .then(function (dataUrl) { 
          const imgWidth = 200;
          const imgHeight = dataUrl.height * imgWidth / dataUrl.width;
          const contentDataURL = dataUrl.toDataURL('image/png');
          const pdf = new jspdf('p', 'mm', 'a4');       
          pdf.addImage(contentDataURL, 'PNG', 5, 0, imgWidth, imgHeight,undefined,'FAST'); 
      //  pdf.addImage(contentDataURL, 'PNG', 5, 0, 21.0,29.7, undefined,'FAST'); 
          pdf.save('Bluski_Invoice_'+that.bill.InvoiceNo.toString()+'.pdf');     
         that.back();     
        });     
      },500)     
    
    //  window.print();
    }   
  
    back(){
      if(this.appconfig.isApp==1){
  this.navCtrl.back();
      }
      else{ 
       window.location.reload();
      }
    }
    
    Share(){ 
      if(this.appconfig.isApp==0){
        // if (window.innerWidth < 1000) {
        //   let link = this.appconfig.link + 'bill/' + this.sid.toString();
        //   if (window.navigator && window.navigator.share) {
        //     window.navigator.share({
        //       url: link,
        //       title: "",
        //       text: ""
        //     })
        //       .then(() => { console.log("Shared YEEEE!!!!!"); })
        //       .catch((error) => { console.log("Sharing Failed") });
        //   }
         
        // } 
      }
      else{
        let link = this.appconfig.link + 'bill/' + this.sid.toString();
        var options = {
          message: 'Share', 
          url: link,
          
        };
        this.socialSharing.shareWithOptions(options);
      }
  }
  
  
  UpdateBillAmount(amnt){
    this.serviceservice.UpdateBillAmountWithServiceBookingId(amnt,this.sid).subscribe((data:any)=>{
      if(data){
        if(data[0].Id>0 && data[0].Error==0){
  // alert('Amount updated successfully!');
        }else{
  
        }
      }
    })
  }
}
