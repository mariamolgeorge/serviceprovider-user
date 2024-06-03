import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.page.html',
  styleUrls: ['./terms-and-condition.page.scss'],
})
export class TermsAndConditionPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  back()
  {
    this.router.navigate(['guest-user-home'])
  }
}
