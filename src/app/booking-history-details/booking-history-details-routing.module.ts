import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingHistoryDetailsPage } from './booking-history-details.page';

const routes: Routes = [
  {
    path: '',
    component: BookingHistoryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingHistoryDetailsPageRoutingModule {}
