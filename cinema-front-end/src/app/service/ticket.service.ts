import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITicket} from '../model/i-ticket';
import {SearchResult} from '../model/search-result';
import {ITicketManagerDto} from '../dto/i-ticket-manager-dto';
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private API_TICKET = environment.api_url;

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

  paginate(page: number, limit: number, ticketId: string, customerId: string, idCard: string,
           phoneNumber: string): Observable<any> {
    return this.http.get<SearchResult<ITicketManagerDto>>(this.API_TICKET + '/ticket/list-ticket-manager?page='
      + (page - 1) + '&size=' + limit + '&ticketId=' + ticketId + '&customerId=' + customerId + '&idCard='
      + idCard + '&phoneNumber=' + phoneNumber, this.httpOptions);
  }

  getTicketManagerById(id: number): Observable<any> {
    return this.http.get<ITicketManagerDto>(this.API_TICKET + '/ticket/find-ticket-by/{id}' + id, this.httpOptions);
  }

  editStatusTicketBy2(iTicket: ITicket): Observable<any> {
    return this.http.patch<void>(this.API_TICKET + '/ticket/edit-ticket-by/' + iTicket.id, iTicket,
      this.httpOptions);
  }
}
