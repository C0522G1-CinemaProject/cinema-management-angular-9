import {Component, OnInit} from '@angular/core';
import {ITicketDto} from '../../../dto/i-ticket-dto';
import {ConfirmBookingTicketService} from '../../../service/confirm-booking-ticket.service';
import {Router} from '@angular/router';
import {render} from 'creditcardpayments/creditCardPayments';
import Swal from 'sweetalert2';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-payment-booking-ticket',
  templateUrl: './payment-booking-ticket.component.html',
  styleUrls: ['./payment-booking-ticket.component.css']
})
export class PaymentBookingTicketComponent implements OnInit {

  informationTicket: ITicketDto;
  idTicket: number;
  action = false;


  constructor(private confirmBookingTicketService: ConfirmBookingTicketService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Thông tin đặt vé');
    console.log(this.action);
    render(
      {
        id: '#myPaypal',
        value: `55`,
        currency: 'VNĐ',
        onApprove: (details) => {
          Swal.fire({
            icon: 'success',
            title: 'Thanh toán thành công!',
            width: 600,
            padding: '3em',
            color: '#716add',
            backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
        `
          });
          this.action = true;
        }
      }
    );
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

  confirmUpdate() {
    this.confirmBookingTicketService.updateStatusTicketById().subscribe(payment => {
      Swal.fire({
        icon: 'success',
        title: 'Đã đặt vé thành công!',
        width: 600,
        padding: '3em',
        // color: '#716add',
        backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
        `
      });
    });
    this.router.navigateByUrl('/confirm-ticket');
  }

}
