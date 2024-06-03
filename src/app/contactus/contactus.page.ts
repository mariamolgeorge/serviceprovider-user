import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  back()
  {
    this.router.navigate(['guest-user-home'])
  }
}
