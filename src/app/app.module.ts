import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from "@angular/common/http"
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AgmCoreModule } from '@agm/core';
import { AlertService } from './alert-info/alert-service.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,SlickCarouselModule,
    AgmCoreModule.forRoot({
    apiKey: 'AIzaSyCWSjKbzKEOAJULQfG9rU2P-xLyDoC4l6M'
  })],
  providers: [Geolocation,LocationAccuracy,AndroidPermissions,AlertService,SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
