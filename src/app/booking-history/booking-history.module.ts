import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AlertInfoModule } from '../alert-info/alert-info.module';

import { IonicModule } from '@ionic/angular';

import { BookingHistoryPage } from './booking-history.page';

const routes: Routes = [
  {
    path: '',
    component: BookingHistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertInfoModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookingHistoryPage]
})
export class BookingHistoryPageModule {}
