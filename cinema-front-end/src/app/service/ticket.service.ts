import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataResult} from '../dto/data-result';
import {TicketDto} from '../dto/ticket-dto';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  // private URL_API_BOOKING_TICKET = 'http://localhost:8080/api/ticket/booking/';
  // private URL_API_CANCELED_TICKET = 'http://localhost:8080/api/ticket/canceled/';
  // private URL_API_HISTORY_POINT = 'http://localhost:8080/api/ticket/history/point/';
  // private URL_API_BIG_POINT = 'http://localhost:8080/api/ticket/history/plusPoint/';
  // private URL_API_SMALL_POINT = 'http://localhost:8080/api/ticket/history/usedPoint/';
  // private URL_API_DELETE_TICKET = 'http://localhost:8080/api/ticket/delete/ticket/';
  private URL_API_BACKEND = 'http://localhost:8080/api/ticket/';


  httpOptions: any;

  constructor(private httpClient: HttpClient, private tokenService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }


  findByCustomerNameAndPoint(): Observable<any> {
    console.log(this.URL_API_BACKEND +
      'findCustomerName/' + this.httpOptions);
    return this.httpClient.get<any>(this.URL_API_BACKEND +
      'findCustomerName/', this.httpOptions);
  }

  showListBookingTicket(page: number, pageSize: number): Observable<any> {
    console.log(this.URL_API_BACKEND +
      'booking?page=' + (page - 1) + '&size=' + pageSize, this.httpOptions);
    return this.httpClient.get<any>(this.URL_API_BACKEND +
      'booking?page=' + (page - 1) + '&size=' + pageSize, this.httpOptions);
  }


  showListCanceledTicket(page: number, pageSize: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_API_BACKEND +
      'canceled?page=' + (page - 1) + '&size=' + pageSize, this.httpOptions);
  }

  showListHistoryPoint(page: number, pageSize: number, startTime: string, endTime: string)
    : Observable<any> {
    return this.httpClient.get<any>(this.URL_API_BACKEND +
      'history/point?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime, this.httpOptions);
  }


  showTheListOfPointsAdded(page: number, pageSize: number, startTime: string, endTime: string)
    : Observable<any> {
    console.log(this.URL_API_BACKEND +
      'history/plusPoint?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime, this.httpOptions);
    return this.httpClient.get<any>(this.URL_API_BACKEND +
      'history/plusPoint?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime, this.httpOptions);
  }


  showListOfUsePoints(page: number, pageSize: number, startTime: string, endTime: string)
    : Observable<any> {
    console.log(this.URL_API_BACKEND +
      'history/usedPoint?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime, this.httpOptions);
    return this.httpClient.get<any>(this.URL_API_BACKEND +
      'history/usedPoint?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime, this.httpOptions);
  }

  deleteTicket(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.URL_API_BACKEND + 'delete/' + id);
  }

}
