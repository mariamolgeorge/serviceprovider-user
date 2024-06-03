import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyAndPolicyPageRoutingModule } from './privacy-and-policy-routing.module';

import { PrivacyAndPolicyPage } from './privacy-and-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyAndPolicyPageRoutingModule
  ],
  declarations: [PrivacyAndPolicyPage]
})
export class PrivacyAndPolicyPageModule {}
