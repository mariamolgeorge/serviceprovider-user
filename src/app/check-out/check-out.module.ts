import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './check-out.component';
import { AgmCoreModule } from '@agm/core';
import { AlertInfoModule } from '../alert-info/alert-info.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CheckOutComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWSjKbzKEOAJULQfG9rU2P-xLyDoC4l6M'
    }),
    AlertInfoModule
  ],
  exports:[CheckOutComponent]
})
export class CheckOutModule { }
