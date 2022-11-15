import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TicketDto} from '../../../dto/ticket-dto';
import {TicketService} from '../../../service/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-ticket-list',
  templateUrl: './booking-ticket-list.component.html',
  styleUrls: ['./booking-ticket-list.component.css']
})
export class BookingTicketListComponent implements OnInit {

  nameDelete: string;
  idDelete: number;
  page = 1;
  pageSize = 5;
  total$: Observable<number>;
  ticketDto$: Observable<TicketDto[]>;
  action: boolean;
  customerName = '';
  customer: TicketDto[];
  totalPoint = '';

  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.showListBookingTicket();
    this.findByCustomerNameAndPoint();

  }

  findByCustomerNameAndPoint() {
    this.ticketService.findByCustomerNameAndPoint().subscribe(value => {
      this.customer = value;
      this.totalPoint = this.customer[0].totalPoint;
      this.customerName = this.customer[0].customerName;

      console.log(this.totalPoint);
    });
  }


  showListBookingTicket() {
    this.ticketService.showListBookingTicket(this.page, this.pageSize).subscribe(value => {
        console.log(value);
        if (value != null) {
          this.action = true;
          this.ticketDto$ = new BehaviorSubject<TicketDto[]>(value.content);
          this.total$ = new BehaviorSubject<number>(value.totalElements);
        } else {
          this.action = false;

        }
      },
      error => {
      });
  }

  confirmDelete(value) {
    const timeBook = new Date(value.bookingTime);
    const now = new Date();
    if (new Date().getTime() - new Date(value.bookingTime).getTime() >= 30 * 60 * 1000) {
      Swal.fire({
        title: 'Không thể hủy vé!',
        text: 'Thời gian đặt vé quá 30 phút.',
        icon: 'warning',
        showCancelButton: false,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Hủy Bỏ',
      });
    } else {
      this.idDelete = value.ticketId;
      console.log(this.idDelete);
      this.nameDelete = value.movieName;
      Swal.fire({
        title: 'Bạn có muốn xóa ' + this.nameDelete + '?',
        text: 'Tác vụ này không thể hoàn tác !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng Ý',
        cancelButtonText: 'Hủy Bỏ',
      }).then((result) => {
        if (result.isConfirmed) {
          this.ticketService.deleteTicket(this.idDelete).subscribe(value1 => {
            console.log(this.idDelete);
            Swal.fire(
              'Đã xóa!',
              'Thông tin này đã được xóa.'
            );
            this.ngOnInit();

          });
        }
      });
    }
  }
}
