import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITicket} from '../model/i-ticket';
import {SearchResult} from '../model/search-result';
import {ITicketManagerDto} from '../dto/i-ticket-manager-dto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private API_TICKET = environment.api_url;

  constructor(private http: HttpClient) {
  }

  paginate(page: number, limit: number, ticketId: string, customerId: string, idCard: string,
           phoneNumber: string): Observable<SearchResult<ITicketManagerDto>> {
    return this.http.get<SearchResult<ITicketManagerDto>>(this.API_TICKET + '/ticket/list-ticket-manager?page='
      + (page - 1) + '&size=' + limit + '&ticketId=' + ticketId + '&customerId=' + customerId + '&idCard='
      + idCard + '&phoneNumber=' + phoneNumber);
  }

  getTicketManagerById(id: number): Observable<ITicketManagerDto> {
    return this.http.get<ITicketManagerDto>(this.API_TICKET + '/ticket/find-ticket-by/{id}' + id);
  }

  editStatusTicketBy2(iTicket: ITicket): Observable<void> {
    return this.http.patch<void>(this.API_TICKET + '/ticket/edit-ticket-by/' + iTicket.id, iTicket);
  }
}
