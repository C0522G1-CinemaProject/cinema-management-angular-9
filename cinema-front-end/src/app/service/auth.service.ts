import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/public/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions: any;
  isLoggedIn: boolean | undefined;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(obj: { username: string; password: string; }): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: obj.username,
      password: obj.password
    }, this.httpOptions);
  }

  // tslint:disable-next-line:max-line-length
  // register(obj: { book_id: any; name: any; gender: any; dateOfBirth: any; guardian: any; address: any; phone: any; email: any; password: any; }): Observable<any> {
  //   console.log(obj);
  //   return this.http.post(AUTH_API + 'signup', {
  //     bookId:obj.book_id,
  //     name:obj.name,
  //     gender:obj.gender,
  //     dateOfBirth:obj.dateOfBirth,
  //     guardian:obj.guardian,
  //     address:obj.address,
  //     phone:obj.phone,
  //     email: obj.email,
  //     password: obj.password,
  //   }, this.httpOptions);
  // }
  //
  // verify(code:string): Observable<any> {
  //   console.log(code);
  //   return this.http.post(AUTH_API + 'verify', {
  //     code: code
  //   }, this.httpOptions);
  // }

  verifyPassword(code: string): Observable<any> {
    return this.http.post(AUTH_API + 'verify-password', {
      code
    }, this.httpOptions);
  }

  forgotPassword(email): Observable<any> {
    return this.http.get(AUTH_API + 'forgot-password?email=' + email, this.httpOptions);
  }

  doResetPassword(password: string, code: string): Observable<any> {
    return this.http.post(AUTH_API + 'do-forgot-password', {
      password,
      code
    }, this.httpOptions);
  }

  resetPassword(resetPassRequest): Observable<any> {
    return this.http.post(AUTH_API + 'comfirm-reset-password', {
      password: resetPassRequest.password,
      confirmPassword: resetPassRequest.confirmPassword,
      token: resetPassRequest.token
    }, this.httpOptions);
  }
}
