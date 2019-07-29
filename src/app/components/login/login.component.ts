import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  login(fomulario: NgForm) {
    console.log('Formulario', fomulario);
    this._auth.login(this.user);
    return;
  }
}
