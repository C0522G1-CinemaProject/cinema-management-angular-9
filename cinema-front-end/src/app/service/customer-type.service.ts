import {Injectable} from '@angular/core';
import {ICustomerType} from '../model/i-customer-type';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  constructor(private http: HttpClient) {
  }


  getAllCustomerType(): Observable<ICustomerType[]> {
    return this.http.get<ICustomerType[]>(environment.api_url + '/customer/customerType');
  }
}
