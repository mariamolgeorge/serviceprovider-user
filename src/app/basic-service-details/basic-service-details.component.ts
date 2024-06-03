import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonMenuToggle } from '@ionic/angular';
import { Services } from '../Class/services';
import { AppConfig } from '../Class/AppConfig';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-basic-service-details',
  templateUrl: './basic-service-details.component.html',
  styleUrls: ['./basic-service-details.component.scss'],
})
export class BasicServiceDetailsComponent implements OnInit {
@Input() item=new Services();
@Output() newItemEvent : EventEmitter<boolean>=new EventEmitter();
serviceitem=new Services();
appconfig=new AppConfig()
  constructor(public router:Router) { }

  ngOnInit() {}

  ngOnchanges(){
    this.serviceitem=this.item;
  }

  handleDisplayImgError(ev: any) {
    let source = ev.srcElement;
    let imgSrc = this.appconfig.AssetUrl + "/assets/img/service.png";
    source.src = imgSrc;
  
  }
  
  CloseSrvice(){
    this.newItemEvent.emit(false);
  }

  OpenCheckoutPage(){
    debugger;
    this.newItemEvent.emit(true);
}

}
