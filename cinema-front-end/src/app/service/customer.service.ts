import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICustomerDto} from '../dto/i-customer-dto';
import {environment} from '../../environments/environment';
import {ICustomer} from '../model/i-customer';
import {TokenStorageService} from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
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

  saveCustomer(customer: ICustomer): Observable<ICustomerDto> {
    return this.http.post<ICustomerDto>(environment.api_url + '/customer/add', customer);
  }

  findCustomerByUsername(): Observable<any> {
    return this.http.get<ICustomer>(environment.api_url + '/customer/find-username', this.httpOptions);
  }

  editCustomer(customer: ICustomerDto, username: string): Observable<void> {
    return this.http.patch<void>(environment.api_url + '/customer/edit?username=' + username, customer);
  }
}
