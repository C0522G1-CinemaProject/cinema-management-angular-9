import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../model/i-user';
import {IEmployee} from '../model/i-employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_URL: string;


  constructor(private http: HttpClient) {
    this.API_URL = environment.api_url;
  }

  // findUser(): Observable<IUser> {
  //   console.log(this.API_URL_TYPE);
  //   return this.http.get<IUser>(this.API_URL_TYPE);
  // }

  addEmployee(employee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.API_URL + 'create', employee);
  }

  getById(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.API_URL + id);
  }

  updateEmployee(id: number, employee: IEmployee): Observable<IEmployee> {
    return this.http.patch<IEmployee>(this.API_URL + 'edit/' + id, employee);
  }

  /*PhuNV Code*/
  findAllEmployee(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.API_URL + 'list');
  }
  deleteEmployee(id: number): Observable<void> {
    // alert(this.API_URL + '/delete' +'/' + id);
    return this.http.delete<void>(this.API_URL + 'delete' + '/' + id);
  }
}
