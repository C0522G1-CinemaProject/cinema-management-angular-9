import {Component, OnInit} from '@angular/core';
import {ITicketDto} from '../../../dto/i-ticket-dto';
import {Router} from '@angular/router';
import {render} from 'creditcardpayments/creditCardPayments';
import Swal from 'sweetalert2';
import {Title} from '@angular/platform-browser';
import {BookingTicketService} from '../../../service/booking-ticket.service';

@Component({
  selector: 'app-payment-booking-ticket',
  templateUrl: './payment-booking-ticket.component.html',
  styleUrls: ['./payment-booking-ticket.component.css']
})
export class PaymentBookingTicketComponent implements OnInit {

  action = false;
  arrayTicket: ITicketDto[] = [];
  total = 0;

  constructor(private bookingTicketService: BookingTicketService,
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
            position: 'center',
            icon: 'success',
            text: 'Vui lòng đặt vé !',
            title: 'Đã thanh toán thành công',
            showConfirmButton: false,
            // timer: 2700
          });
          this.action = true;
        }
      }
    );
    console.log('sddđ');
  }

  ngOnInit(): void {
    this.getTicket();
  }

  confirmUpdate() {
    this.bookingTicketService.updateStatusTicketByUserName().subscribe(payment => {
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
      }, error => {
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
      },
      () => {
      });
    this.router.navigateByUrl('ticket/confirm-ticket');
  }

  getTicket(): void {
    this.bookingTicketService.getTicketByuserName().subscribe(value => {
        this.arrayTicket = value;
        // this.total += value.price;
        // console.log(this.total);
        // tslint:disable-next-line:forin
        for (let index in value) {
          // console.log(index); // prints indexes: 0, 1, 2, 3
          this.total += value[index].price; // prints elements: 10, 20, 30, 40
        }
        console.log('sfdsfsdf');
        console.log(value);
      },
      error => {
        console.log(error);
      }, () => {
        console.log('ok');
      });
  }

  payment() {
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
}
