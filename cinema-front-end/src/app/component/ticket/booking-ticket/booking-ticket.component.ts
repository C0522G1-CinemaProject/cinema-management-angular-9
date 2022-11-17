import {Component, OnInit} from '@angular/core';
import {IMovieBookingDto} from '../../../dto/i-movie-booking-dto';
import {IShowDateBookingDto} from '../../../dto/i-show-date-booking-dto';
import {IShowtimesBookingDto} from '../../../dto/i-showtimes-booking-dto';
import {BookingTicketService} from '../../../service/booking-ticket.service';
import {BehaviorSubject, Observable} from 'rxjs';


@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.css']
})
export class BookingTicketComponent implements OnInit {
  movies$: Observable<IMovieBookingDto[]>;
  showDates$: Observable<IShowDateBookingDto[]>;
  showTimes$: Observable<IShowtimesBookingDto[]>;

  movieChoose: IMovieBookingDto;
  showDateChoose: IShowDateBookingDto;
  showTimeChoose: IShowtimesBookingDto;

  constructor(private bookingTicketService: BookingTicketService) {
  }

  ngOnInit(): void {
    this.getAllMovieInNext7Days();
  }

  getAllMovieInNext7Days(): void {
    this.bookingTicketService.findAllMovieInNext7Days().subscribe(value => {
        this.movies$ = new BehaviorSubject<IMovieBookingDto[]>(value);
      },
      error => {
        console.log(error);
      });
  }

  getShowDateByMovie(): void {
    this.bookingTicketService.findAllShowDateByMovie(this.movieChoose.id).subscribe(value => {
        this.showDates$ = new BehaviorSubject<IShowDateBookingDto[]>(value);
      },
      error => {
        console.log(error);
      });
  }

  getShowTimeByShowDate(): void {
    this.bookingTicketService.findAllShowTimeByShowDate(this.showDateChoose.showDate).subscribe(value => {
        this.showTimes$ = new BehaviorSubject<IShowtimesBookingDto[]>(value);
      },
      error => {
        console.log(error);
      });
  }

  changeMovie(): void {
    this.showDateChoose = undefined;
    this.showTimeChoose = undefined;
    this.getShowDateByMovie();
  }

  chanShowDate() {
    this.showTimeChoose = undefined;
    this.getShowTimeByShowDate();
  }

  transmissionData() {
    this.bookingTicketService.changeData(this.movieChoose, this.showDateChoose, this.showTimeChoose);
  }
}
