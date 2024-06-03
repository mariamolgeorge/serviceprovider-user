import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guest-user-home',
    pathMatch: 'full'
  },

  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'guest-user-home',
    loadChildren: () => import('./guest-user-home/guest-user-home.module').then( m => m.GuestUserHomePageModule)
  },
  {
    path: 'service-details',
    loadChildren: () => import('./service-details/service-details.module').then( m => m.ServiceDetailsPageModule)
  },
  {
    path: 'service-booking',
    loadChildren: () => import('./service-booking/service-booking.module').then( m => m.ServiceBookingPageModule)
  },
  {
    path: 'user-registration',
    loadChildren: () => import('./user-registration/user-registration.module').then( m => m.UserRegistrationPageModule)
  },

  { 
    path: 'login', 
  loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'service-list',
    loadChildren: () => import('./service-list/service-list.module').then( m => m.ServiceListPageModule)
  },
  {
    path: 'select-address',
    loadChildren: () => import('./select-address/select-address.module').then( m => m.SelectAddressPageModule)
  },
  {
    path: 'select-date-time',
    loadChildren: () => import('./select-date-time/select-date-time.module').then( m => m.SelectDateTimePageModule)
  },
  {
    path: 'privacy-and-policy',
    loadChildren: () => import('./privacy-and-policy/privacy-and-policy.module').then( m => m.PrivacyAndPolicyPageModule)
  },
  {
    path: 'refund-policy',
    loadChildren: () => import('./refund-policy/refund-policy.module').then( m => m.RefundPolicyPageModule)
  },
  {
    path: 'terms-and-condition',
    loadChildren: () => import('./terms-and-condition/terms-and-condition.module').then( m => m.TermsAndConditionPageModule)
  },
  {
    path: 'booking-history',
    loadChildren: () => import('./booking-history/booking-history.module').then( m => m.BookingHistoryPageModule)
  },
  {
    path: 'booking-history-details',
    loadChildren: () => import('./booking-history-details/booking-history-details.module').then( m => m.BookingHistoryDetailsPageModule)
  },
  {
    path: 'bill/:id',
    loadChildren: () => import('./bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'user-details',
    loadChildren: () => import('./user-details/user-details.module').then( m => m.UserDetailsPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  

  // { 

  //   path:  'city-selection',
  //   loadChildren: () => import('./city-selection/city-selection.module').then( m => m.CitySelectionPageModule)

  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
