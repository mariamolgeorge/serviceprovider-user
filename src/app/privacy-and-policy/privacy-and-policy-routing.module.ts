import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyAndPolicyPage } from './privacy-and-policy.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacyAndPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyAndPolicyPageRoutingModule {}
