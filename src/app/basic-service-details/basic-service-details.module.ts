import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicServiceDetailsComponent } from './basic-service-details.component';



@NgModule({
  declarations: [BasicServiceDetailsComponent],
  imports: [
    CommonModule
  ],
  exports:[BasicServiceDetailsComponent]
})
export class BasicServiceDetailsModule { }
