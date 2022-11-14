import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICustomer} from '../../model/i-customer';
import {CustomerResult} from '../../model/customer-result';
import {TokenStorageService} from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL_API = `${environment.api_url}`;

  httpOptions: any;

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getCustomer(name: string, page: number, pageSize: number): Observable<CustomerResult<ICustomer>> {
    console.log(this.URL_API + '/list?nameSearch=' + name + '&page=' + (page - 1) + '&size=' + pageSize);
    return this.http.get<CustomerResult<ICustomer>>(this.URL_API + '/list?nameSearch=' +
      name + '&page=' + (page - 1) + '&size=' + pageSize);
  }

  findById(id: number): Observable<ICustomer> {
    console.log(this.URL_API + '/' + id);
    return this.http.get<ICustomer>(this.URL_API + '/find/' + id);
  }

  editObject(icustomer: ICustomer): Observable<void> {
    console.log(icustomer);
    return this.http.patch<void>(this.URL_API + '/edit/' + icustomer.id, icustomer);
  }
}
