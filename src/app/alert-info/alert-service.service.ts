import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable() export class AlertService {
  private subject = new Subject<any>();
  deliverychargemsg:string='';
  constructor() {

   }
  Alert(message: string, type: number, yesFn: (remarks?) => void, closeFn: () => void) {
    this.setAlert(message, type, yesFn, closeFn);
  }
  setAlert(message: string, type: number, yesFn: (remarks?) => void, closeFn: () => void) {
    let that = this;
    this.subject.next({
      type: type,
      text: message,
      yesFn:
        function (remarks?) {
          that.subject.next(); //this will close the modal
          !!remarks ? yesFn(remarks) : yesFn();
        },
      closeFn: function () {
        that.subject.next();
        closeFn();
      }
    });
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }


 



}