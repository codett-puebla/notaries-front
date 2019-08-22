import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserModel} from '../../models/user.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  private requestInProcess = false;

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {

  }

  ngOnInit() {
    if (this._auth.checkClosedSession()) {
      this._auth.restartTokenMasterlogin();
    }
  }

  login(form: NgForm) {
    if (this.validateForm(form) || !this.isLoggedMasterLogin()) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Iniciando sesión, espere por favor...'
    });
    Swal.showLoading();
    this._auth.login(this.user).subscribe(
      response => {
        Swal.close();
        this.saveDataUser(response['user']);
        this._router.navigateByUrl('/dashboard');
        this._auth.setLogged(true);
      },
      error => {
        Swal.close();
        console.log(error);
        let message = '';
        this._auth.setLogged(false);
        if (error.error.code == 401 || error.status == 404) {
          message = 'Revisa tu correo o contraseña, alguno es incorrecto';
        } else {
          message = 'Ocurrio un error desconocido, intenta mas tarde';
        }
        Swal.fire({
          type: 'error',
          title: 'Error en el inicio de sesión',
          text: message
        });
      }
    );

  }

  validateForm(form: NgForm): boolean {
    return form.invalid;
  }

  saveDataUser(user) {
    localStorage.setItem('username', user.email);
    localStorage.setItem('name', user.name);
    localStorage.setItem('user_type', user.user_type);
    localStorage.setItem('create_time', user.create_time);
  }

  isLoggedMasterLogin(): boolean {
    console.log('status --->', this._auth.checkStatusLoggedMaterlogin());
    if (!this._auth.checkStatusLoggedMaterlogin()) {
      Swal.fire({
        type: 'error',
        title: 'Error en el inicio de sesión',
        text: 'Ocurrio un error en los servidores. Intente mas tarde'
      });
    }

    return this._auth.checkStatusLoggedMaterlogin();
  }
}
