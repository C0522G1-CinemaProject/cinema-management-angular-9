import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmBookingTicketService} from '../../../service/confirm-booking-ticket.service';
import {ITicketDto} from '../../../dto/i-ticket-dto';
import {Title} from '@angular/platform-browser';
import {BookingTicketService} from '../../../service/booking-ticket.service';
import {ITicket} from '../../../model/i-ticket';
import {BehaviorSubject, Observable} from 'rxjs';
import {IShowDateBookingDto} from '../../../dto/i-show-date-booking-dto';
import {IMovieBookingDto} from '../../../dto/i-movie-booking-dto';

@Component({
  selector: 'app-confirm-booking-ticket',
  templateUrl: './confirm-booking-ticket.component.html',
  styleUrls: ['./confirm-booking-ticket.component.css']
})
export class ConfirmBookingTicketComponent implements OnInit {
  arrayTicket: ITicketDto[] = [];
  total = 0;

  constructor(private bookingTicketService: BookingTicketService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Xác nhận đặt vé');
  }


  ngOnInit(): void {
    this.getTicket();
  }

  getTicket(): void {
    this.bookingTicketService.getTicketByuserName().subscribe(value => {
        this.arrayTicket = value;
        // this.total += value.price;
        // console.log(this.total);
        console.log('sfdsfsdf');
        console.log(value);
      },
      error => {
        console.log(error);
      });
  }


}
