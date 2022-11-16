import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TicketDto} from '../../../dto/ticket-dto';
import {TicketService} from '../../../service/ticket.service';

@Component({
  selector: 'app-history-point-list',
  templateUrl: './history-point-list.component.html',
  styleUrls: ['./history-point-list.component.css']
})
export class HistoryPointListComponent implements OnInit {

  page = 1;
  pageSize = 5;
  startTime = '';
  endTime = '';
  point = '';
  total$: Observable<number>;
  ticketDto$: Observable<TicketDto[]>;
  action: boolean;
  customerName = '';
  customer: TicketDto[];
  totalPoint = '';
  validateTime = new Date();

  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.showListHistoryPoint();
    this.findByCustomerNameAndPoint();

  }


  findByCustomerNameAndPoint() {
    this.ticketService.findByCustomerNameAndPoint().subscribe(value => {
      this.customerName = value.customerName;
      this.totalPoint = value.totalPoint;
    });
  }

  showListHistoryPoint() {
    this.ticketService.showListHistoryPoint(this.page, this.pageSize, this.startTime, this.endTime).subscribe(value => {
      if (value != null) {
        this.action = true;
        this.ticketDto$ = new BehaviorSubject<TicketDto[]>(value.content);
        this.total$ = new BehaviorSubject<number>(value.totalElements);
      } else {
        this.action = false;
      }
    });
  }


  showTheListOfPointsAdded() {
    this.ticketService.showTheListOfPointsAdded(this.page, this.pageSize, this.startTime, this.endTime).subscribe(value => {
      if (value != null) {
        this.action = true;
        this.ticketDto$ = new BehaviorSubject<TicketDto[]>(value.content);
        this.total$ = new BehaviorSubject<number>(value.totalElements);
      } else {
        this.action = false;
      }
    });
  }

  showListOfUsePoints() {
    this.ticketService.showListOfUsePoints(this.page, this.pageSize, this.startTime, this.endTime).subscribe(value => {
      if (value != null) {
        this.action = true;
        this.ticketDto$ = new BehaviorSubject<TicketDto[]>(value.content);
        this.total$ = new BehaviorSubject<number>(value.totalElements);
      } else {
        this.action = false;
      }
    });
  }

  getAllSearch() {
    if (Number(this.point) === 1) {
      this.showTheListOfPointsAdded();
    } else if (Number(this.point) === -1) {
      this.showListOfUsePoints();
    } else {
      this.showListHistoryPoint();
    }
  }

}
