import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectDateTimePageRoutingModule } from './select-date-time-routing.module';

import { SelectDateTimePage } from './select-date-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectDateTimePageRoutingModule
  ],
  declarations: [SelectDateTimePage]
})
export class SelectDateTimePageModule {}
