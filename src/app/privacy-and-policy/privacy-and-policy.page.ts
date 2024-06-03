import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-and-policy',
  templateUrl: './privacy-and-policy.page.html',
  styleUrls: ['./privacy-and-policy.page.scss'],
})
export class PrivacyAndPolicyPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  back()
  {
    this.router.navigate(['guest-user-home'])
  }
}
