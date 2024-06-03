import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  Services:any=[
    {name:'Hard Services'},
    {name:'AC Maintenance'},
    {name:'Electrical Maintenance'},
    {name:'Plumbing Maintenance'},
    {name:'Civil & Painting services'},
    {name:'Carpentry'},
    {name:'Tiles and Interlocks - Interior and exterior'},
    {name:'Fabrication - Steel, Metal & Truss'},
    {name:'Mosquito Roll-up Nets'},
    {name:'Blinds & Curtains'},
    {name:'Stainless steel water tanks'},
    {name:'Water filtration systems'},
    {name:'Solar - ON / OFF grid solutions'},
    {name:'Inverter systems'},
    {name:'Rent out and leasing services'},
    {name:'Soft Services'},
    {name:'Cleaning Services'},
    {name:'Disinfection services'},
    {name:'Pest control services'},
    {name:'Building management services'},



  ]

  constructor(public router:Router) { }

  ngOnInit() {
  }
  back()
  {
    this.router.navigate(['guest-user-home'])
  }
}
