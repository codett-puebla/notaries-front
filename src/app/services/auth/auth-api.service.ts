import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private notaryHost = 'http://notary.test/oauth/token';
  private requestBody = {
    grant_type: 'client_credentials',
    client_id: 3,
    client_secret: 'ldY0IdQhvuV6vKhCFjRalxfRgIGFUfm4cqZZRvrZ'
  };
  private headers = new HttpHeaders();
  private tokenApi: string;
  private statusApi = false;
  private closedSession = false;

  constructor(private _http: HttpClient) {
    this.login();
  }

  login() {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');

    this._http.post(
      this.notaryHost, this.requestBody,
      {headers: this.headers}
    ).subscribe(
      response => this.saveToken(response),
      error => console.error('Error --> ', error)
    );
  }

  saveToken(response) {
    this.statusApi = true;
    console.log('Logged api success', this.statusApi);
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

  getStatusLoggedMasterLoginApi(): boolean {
    return this.statusApi;
  }

  getStatusClosedSession(): boolean {
    return this.closedSession;
  }

  setStatusLogout() {
    this.statusApi = false;
    this.closedSession = true;
  }
}
