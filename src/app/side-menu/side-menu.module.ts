import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu.component';
import { AlertInfoModule } from '../alert-info/alert-info.module';



@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    AlertInfoModule
  ],
  exports:[SideMenuComponent]
})
export class SideMenuModule { }
