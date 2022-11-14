import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmBookingTicketService} from '../../../service/confirm-booking-ticket.service';
import {ITicketDto} from '../../../dto/i-ticket-dto';

@Component({
  selector: 'app-confirm-booking-ticket',
  templateUrl: './confirm-booking-ticket.component.html',
  styleUrls: ['./confirm-booking-ticket.component.css']
})
export class ConfirmBookingTicketComponent implements OnInit {

  informationTicket: ITicketDto;
  idTicket: number;

  constructor(private confirmBookingTicketService: ConfirmBookingTicketService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.confirmBookingTicketService.getTicketById(this.idTicket).subscribe(detail => {
      this.informationTicket = detail;
      },
      error => {
        console.log(error);
      },
      () => console.log('OK!'));
  }


}
