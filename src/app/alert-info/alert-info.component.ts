import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AlertService } from './alert-service.service';

@Component({
  selector: 'app-alert-info',
  templateUrl: './alert-info.component.html',
  styleUrls: ['./alert-info.component.scss'],
})
export class AlertInfoComponent implements OnInit {
  @Input() InputData: any;
  @Output() buttonEvent: EventEmitter<any> = new EventEmitter<any>();
  // BodyClass: string = 'bg-light';
  // WarningClass: string = 'modal fade';
  // StyleClass: string = 'display:none';
  // BackFade: string = '';
  BodyClass = 'modal-open';
  WarningClass = 'modal fade bd-example-modal-sm show';
  StyleClass = 'display:block;';
  BackFade = 'modal-backdrop fade show';
  
  message: any;
  remarks: any;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.remarks = undefined;
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }


  ngOnChanges() {


  }

  Submit(type) {
    if (type == 1) {
      this.buttonEvent.emit({ isSuccess: 1, isCancel: 0 });
    }
    else if (type == 2) {
      this.CloseWindow();
    }
    else if (type == 3) {
      this.buttonEvent.emit({ isSuccess: 0, isCancel: 1 });
    }
  }



  Open() {
    this.BodyClass = 'bg-light modal-open';
    this.WarningClass = 'modal fade show';
    this.StyleClass = 'display:block;';
    this.BackFade = 'modal-backdrop fade show';
  }


  CloseWindow() {
    this.BodyClass = '';
    this.WarningClass = 'modal fade';
    this.StyleClass = 'display:none;';
    this.BackFade = '';
    this.buttonEvent.emit({ isSuccess: 1, isCancel: 0 });
  }

}
