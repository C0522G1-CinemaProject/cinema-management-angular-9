import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ITicketDto} from '../../../dto/i-ticket-dto';
import {Title} from '@angular/platform-browser';
import {BookingTicketService} from '../../../service/booking-ticket.service';

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
        console.log('hihi');
        // console.log(value.price);
        // this.total += value.price;
        // console.log(value[0].price);
        // tslint:disable-next-line:forin
        for (let index in value) {
          // console.log(index); // prints indexes: 0, 1, 2, 3
          this.total += value[index].price; // prints elements: 10, 20, 30, 40
        }
        // console.log(this.total);
        // console.log(value);
      },
      error => {
        console.log(error);
      });
  }


}
