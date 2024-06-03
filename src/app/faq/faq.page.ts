import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  back()
  {
    this.router.navigate(['guest-user-home'])
  }
}
