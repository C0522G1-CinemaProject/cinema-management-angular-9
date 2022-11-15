import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TicketDto} from '../../../dto/ticket-dto';
import {TicketService} from '../../../service/ticket.service';

@Component({
  selector: 'app-canceled-ticket-list',
  templateUrl: './canceled-ticket-list.component.html',
  styleUrls: ['./canceled-ticket-list.component.css']
})
export class CanceledTicketListComponent implements OnInit {

  delName: string;
  delId: number;
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
    this.showListCanceledTicket();
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


  showListCanceledTicket() {
    this.ticketService.showListCanceledTicket(this.page, this.pageSize).subscribe(value => {
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

}
