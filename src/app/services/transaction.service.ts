import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_BASE} from './ConfigURL';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly URL_PATH: string;

  constructor(private http: HttpClient) {
    this.URL_PATH = URL_BASE + 'transaction';
  }

  add(data: any): Observable<any> {
    return this.http.post(this.URL_PATH, data);
  }

  getAll(): Observable<any> {
    return this.http.get(this.URL_PATH + '?idCompany=1')/*.pipe(map((data: any) => data.data))*/;
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.URL_PATH}/${id}`)/*.pipe(map((data: any) => data.data))*/;
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.URL_PATH}/${id}`);
  }

  edit(data: any, id: number): Observable<any> {
    console.log(data);
    return this.http.put(`${this.URL_PATH}/${id}`, data);
  }

  // getUserAuthenticated(): Observable<any> {
  //   return this.http.get(`${URL_BASE}authenticated-user`);
  // }
  //
  // getAreaUser(): Observable<any> {
  //   return this.http.get(`${URL_BASE}area-user`).pipe(map((data: any) => data.data.area_users));
  // }
  //
  // getAreaUsers(body: any[]): Observable<any> {
  //   const array: any[] = [];
  //   for (const item of body) {
  //     array.push({id: item.id});
  //   }
  //   return this.http.post(`${URL_BASE}areas-users`, {areas: array}).pipe(map((data: any) => data.data));
  // }
}
