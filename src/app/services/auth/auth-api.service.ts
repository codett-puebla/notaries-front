import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private notaryHost = 'http://notary.test/oauth/token';
  private requestBody = {
    grant_type: 'client_credentials',
    client_id: 1,
    client_secret: 'LNxFKvTLk77C7f9W0sIh6IwJ9RGLzKIHp8cMMnT7'
  };


  private tokenApi: string;

  constructor(private _http: HttpClient) {
    this.login();
  }

  login() {
    this._http.post(
      this.notaryHost, this.requestBody
    ).subscribe(
      response => this.saveToken(response),
      error => console.error('Error --> ', error)
    );
  }

  saveToken(response) {
    console.log('Logged api success');
    localStorage.setItem('token_typeApi', response.token_type);
    localStorage.setItem('expires_inApi', response.expires_in);
    localStorage.setItem('access_tokenApi', response.access_token);
    this.tokenApi = response.access_token;
  }

  getToken() {
    if (localStorage.getItem('access_tokenApi')) {
      this.tokenApi = localStorage.getItem('access_tokenApi');
    } else {
       this.tokenApi = null;
    }
    return this.tokenApi;
  }
}
