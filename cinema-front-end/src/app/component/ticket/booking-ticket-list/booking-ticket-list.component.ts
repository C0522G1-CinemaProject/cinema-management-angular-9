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
  name = '';
  total$: Observable<number>;
  ticketDto$: Observable<TicketDto[]>;
  action: boolean;
  today = new Date();
  time = '';


  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.showListBookingTicket();
  }


  showListBookingTicket() {
    this.ticketService.showListBookingTicket(this.page, this.pageSize).subscribe(value => {
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
    this.nameDelete = value.movieName;
    this.idDelete = value.ticketId;
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
