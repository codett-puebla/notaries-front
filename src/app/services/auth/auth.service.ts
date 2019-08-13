import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../../models/user.model';
import {AuthApiService} from './auth-api.service';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private notaryHost = 'http://notary.test/getOauth';
  private headers = new HttpHeaders();
  private tokenUser: string;
  constructor(
    private _http: HttpClient,
    private _authApi: AuthApiService
  ) {

  }

  login(user: UserModel) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', `bearer ${this._authApi.getToken()}`);

    return this._http.post(this.notaryHost,
      user,
      {headers : this.headers}
      ).pipe(map(
      response => {
        this.saveTokenUser(response);
        return response;
      }
    ));
  }

  saveTokenUser(response) {
    console.log('Logged api success');
    localStorage.setItem('token_typeUser', response.token.token_type);
    localStorage.setItem('expires_inUser', response.token.expires_in);
    localStorage.setItem('access_tokenUser', response.token.access_token);
    this.tokenUser = response.token.access_token;
  }

}
