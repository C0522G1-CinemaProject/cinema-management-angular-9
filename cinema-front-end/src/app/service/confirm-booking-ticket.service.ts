import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITicket} from '../model/i-ticket';
import {ITicketDto} from '../dto/i-ticket-dto';

@Injectable({
  providedIn: 'root'
})
export class ConfirmBookingTicketService {

  private API_URL = environment.api_url;

  constructor(private httpClient: HttpClient) {
  }

  getTicketById(id: number): Observable<ITicketDto> {
    return this.httpClient.get<ITicketDto>(this.API_URL + '/ticket/list-ticket/1');
  }

  updateStatusTicketById(): Observable<void> {
    // @ts-ignore
    return this.httpClient.put<void>(this.API_URL + '/ticket/update-ticket/1');
  }
}
