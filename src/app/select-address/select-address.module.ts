import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectAddressPageRoutingModule } from './select-address-routing.module';

import { SelectAddressPage } from './select-address.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectAddressPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWSjKbzKEOAJULQfG9rU2P-xLyDoC4l6M'
    })
  ],
  declarations: [SelectAddressPage]
})
export class SelectAddressPageModule {}
