import { Component, Compiler } from '@angular/core';
import { AppConfig } from './Class/AppConfig';
import { Platform } from '@ionic/angular';
import { AppVersionService } from './Providers/app-version.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  Hide:number=0;
 appconfig=new AppConfig;
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private platform: Platform,private appversion:AppVersionService,
       private compiler:Compiler) {}


  CheckAppVersion() {
    debugger
    this.appversion.GetAppVersion().subscribe(data => {
      if (data) {
        if (data.Version != this.appconfig.Version) {
          if (this.platform.is('desktop') || this.platform.is('mobileweb') || this.platform.is('pwa')) {
            this.compiler.clearCache();
            window.location.reload(true);
          }
          else if (this.platform.is('cordova')) {
            this.compiler.clearCache();
            if (this.platform.is('android')) {
              if (data.IsForceUpdate == 1) {
               // alert('A New Version of TagLah App is Now Available. Please Update!');
               // window.open("https://play.google.com/store/apps/details?id=com.init.kathirmandapam", "_blank");
              } else {
               // if (confirm("A New Version of TagLah App is Now Available. Do you want to Update?")) {
                //  window.open("https://play.google.com/store/apps/details?id=com.init.kathirmandapam", "_blank");
                //}
              }
            }
            else if (this.platform.is('ios')) {
              if (data.IsForceUpdate == 1) {
                // alert('A New Version of TagLah App is Now Available. Please Update!');
                //window.open("https://apps.apple.com/in/app/paramekkavu/id1514604740", "_blank");
              } else {
                // if (confirm("A New Version of TagLah App is Now Available. Do you want to Update?")) {
                // window.open("https://apps.apple.com/in/app/paramekkavu/id1514604740", "_blank");
                //}
              }
            } else {
              this.compiler.clearCache();
              window.location.reload(true);
            }
          }
          else if (this.platform.is('android') || this.platform.is('ios')) {
            this.compiler.clearCache();
           // alert('In android/ios Device')
            if (data.IsForceUpdate == 1) {
             // alert('A New Version of TagLah App is Now Available. Please Update!');
              //window.open("https://play.google.com/store/apps/details?id=com.init.kathirmandapam", "_blank");
            } else {
              //if (confirm("A New Version of TagLah App is Now Available. Do you want to Update?")) {
                //window.open("https://play.google.com/store/apps/details?id=com.init.kathirmandapam", "_blank");
              //}
            }
          }else if(this.platform.is('iphone') || this.platform.is('ipad')){
            this.compiler.clearCache();
            window.location.reload(true);
          }
        }else{
          this.compiler.clearCache();
        }
      }
    });
  }
}
