import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  toggle: boolean;
  @Output() changeToggleEmiter: EventEmitter<boolean>;

  constructor() {
    this.toggle = false;
    this.changeToggleEmiter = new EventEmitter();
  }

  changeToogle() {
    this.toggle = !this.toggle;
    this.changeToggleEmiter.emit(this.toggle);
  }

}
