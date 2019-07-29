import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private notaryHost      = 'notary.test/oauth/token';
  private notaryGrantType = 'client_credentials';
  private notaryClienteId = '1';
  private notaryToken = 'Cyu4KeefB90zD9530l4aSqBg4IeuFoq1pZ3E44JB';

  constructor(private _http: HttpClient) {
  }

  login(user: UserModel){
    console.log("Hago el login", user);
  }
}
