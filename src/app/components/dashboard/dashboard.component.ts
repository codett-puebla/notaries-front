import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toggle: boolean;

  constructor() { }

  ngOnInit() {
  }


  changeToggle(toggle) {
    this.toggle = toggle;
  }

}
