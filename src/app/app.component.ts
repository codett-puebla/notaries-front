import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notaries-front';
  toggle: boolean;

  changeToggle(toggle) {
    this.toggle = toggle;
  }

  ///#f8f9fa
}
