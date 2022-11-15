import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataResult} from '../dto/data-result';
import {TicketDto} from '../dto/ticket-dto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private URL_API_BOOKING_TICKET = 'http://localhost:8080/api/booking/ticket/';
  private URL_API_CANCELED_TICKET = 'http://localhost:8080/api/canceled/ticket/';
  private URL_API_HISTORY_POINT = 'http://localhost:8080/api/history/point/';
  private URL_API_BIG_POINT = 'http://localhost:8080/api/history/bigPoint/';
  private URL_API_SMALL_POINT = 'http://localhost:8080/api/history/smallPoint/';
  private URL_API_DELETE_TICKET = 'http://localhost:8080/api/delete/ticket/';


  constructor(private http: HttpClient) {
  }

  showListBookingTicket(page: number, pageSize: number): Observable<DataResult<TicketDto>> {
    return this.http.get<DataResult<TicketDto>>(this.URL_API_BOOKING_TICKET +
      '?page=' + (page - 1) + '&size=' + pageSize);
  }



  showListCanceledTicket(page: number, pageSize: number): Observable<DataResult<TicketDto>> {
    return this.http.get<DataResult<TicketDto>>(this.URL_API_CANCELED_TICKET +
      '?page=' + (page - 1) + '&size=' + pageSize);
  }

  showListHistoryPoint(page: number, pageSize: number, startTime: string, endTime: string)
    : Observable<DataResult<TicketDto>> {
    console.log(this.URL_API_HISTORY_POINT +
      '?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime);
    return this.http.get<DataResult<TicketDto>>(this.URL_API_HISTORY_POINT +
      '?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime);
  }


  showListBigPoint(page: number, pageSize: number, startTime: string, endTime: string)
    : Observable<DataResult<TicketDto>> {
    console.log(this.URL_API_BIG_POINT +
      '?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime);
    return this.http.get<DataResult<TicketDto>>(this.URL_API_BIG_POINT +
      '?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime);
  }

  showListSmallPoint(page: number, pageSize: number, startTime: string, endTime: string)
    : Observable<DataResult<TicketDto>> {
    console.log(this.URL_API_SMALL_POINT +
      '?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime);
    return this.http.get<DataResult<TicketDto>>(this.URL_API_SMALL_POINT +
      '?page=' + (page - 1) + '&size=' + pageSize + '&startTime=' + startTime + '&endTime=' + endTime);
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(this.URL_API_DELETE_TICKET + id);
  }
}
