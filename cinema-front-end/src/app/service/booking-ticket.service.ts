import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IMovieBookingDto} from "../dto/i-movie-booking-dto";
import {IShowtimesBookingDto} from "../dto/i-showtimes-booking-dto";
import {IShowDateBookingDto} from "../dto/i-show-date-booking-dto";
import {ISeatDetailBookingDto} from "../dto/i-seat-detail-booking-dto";
import {ITicket} from "../model/i-ticket";
import {ICustomer} from "../model/i-customer";
import {ISeatDetail} from "../model/i-seat-detail";

// const API_URL = `${environment.api_url}`;
const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class BookingTicketService {
  private movieBooking = new BehaviorSubject<IMovieBookingDto>(undefined);
  private showDateBooking = new BehaviorSubject<IShowDateBookingDto>(undefined);
  private showTimeBooking = new BehaviorSubject<IShowtimesBookingDto>(undefined);
  curMovie = this.movieBooking.asObservable();
  curShowDate = this.showDateBooking.asObservable();
  curShowTime = this.showTimeBooking.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  findAllMovieInNext7Days(): Observable<IMovieBookingDto[]> {
    return this.httpClient.get<IMovieBookingDto[]>(API_URL + '/booking-ticket/movie');
  }

  findAllShowDateByMovie(idMovie: number): Observable<IShowDateBookingDto[]> {
    return this.httpClient.get<IShowDateBookingDto[]>(API_URL + '/booking-ticket/show-date/' + idMovie);
  }

  findAllShowTimeByShowDate(showDate: string): Observable<IShowtimesBookingDto[]> {
    return this.httpClient.get<IShowtimesBookingDto[]>(API_URL + '/booking-ticket/showtime/' + showDate);
  }

  findAllSeatByShowTime(idShowTime: number): Observable<ISeatDetailBookingDto[]> {
    return this.httpClient.get<ISeatDetailBookingDto[]>(API_URL + '/booking-ticket/seat-detail/' + idShowTime);
  }

  changeData(movie: IMovieBookingDto, showDate: IShowDateBookingDto, showTime: IShowtimesBookingDto): void {
    this.movieBooking.next(movie);
    this.showDateBooking.next(showDate);
    this.showTimeBooking.next(showTime);
  }

  addPendingTicket(ticket: ITicket): Observable<ITicket> {
    return this.httpClient.post<ITicket>(API_URL + '/booking-ticket/add-pending-ticket', ticket);
  }

  getCustomerByUsername(username: string): Observable<ICustomer> {
    return this.httpClient.get<ICustomer>(API_URL + '/booking-ticket/customer/' + username);
  }

  getSeatDetailById(id: number): Observable<ISeatDetail> {
    return this.httpClient.get<ISeatDetail>(API_URL + '/booking-ticket/seat/' + id);
  }
}
