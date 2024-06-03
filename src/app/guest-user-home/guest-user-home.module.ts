import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuestUserHomePage } from './guest-user-home.page';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { SideMenuModule } from '../side-menu/side-menu.module';
import { BasicServiceDetailsModule } from '../basic-service-details/basic-service-details.module';
import { CheckOutModule } from '../check-out/check-out.module';
// import { SideMenuPageModule } from '../side-menu/side-menu.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
const routes: Routes = [
  {
    path: '',
    component: GuestUserHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SideMenuModule,
    BasicServiceDetailsModule,
    CheckOutModule,SlickCarouselModule
  ],
  declarations: [GuestUserHomePage]
})
export class GuestUserHomePageModule {}
