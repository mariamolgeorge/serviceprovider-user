
import { Injectable, EventEmitter } from '@angular/core';
export interface MenuInterface {
  Menu:string;
}
/*
  Generated class for the MenuControlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class MenuControlProvider {
  menuinterface:MenuInterface={Menu:'sidebar-menu view-sidebar'}
menuEvent: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('Hello MenuControlProvider Provider');
  }

}
