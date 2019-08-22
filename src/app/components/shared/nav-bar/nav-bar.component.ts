import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoginComponent} from '../../login/login.component';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  toggle: boolean;
  @Output() changeToggleEmiter: EventEmitter<boolean>;

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {
    this.toggle = false;
    this.changeToggleEmiter = new EventEmitter();
  }

  changeToogle() {
    this.toggle = !this.toggle;
    this.changeToggleEmiter.emit(this.toggle);
  }

  logout() {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }

}
