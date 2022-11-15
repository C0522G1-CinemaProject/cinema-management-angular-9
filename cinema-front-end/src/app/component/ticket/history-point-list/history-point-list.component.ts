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

  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.showListHistoryPoint();
  }

  showListHistoryPoint() {
    this.ticketService.showListHistoryPoint(this.page, this.pageSize, this.startTime, this.endTime).subscribe(value => {
      console.log(value);
      console.log('1');
      if (value != null) {
        this.action = true;
        this.ticketDto$ = new BehaviorSubject<TicketDto[]>(value.content);
        this.total$ = new BehaviorSubject<number>(value.totalElements);
      } else {
        this.action = false;
      }
    });
  }


  showListBigPoint() {
    this.ticketService.showListBigPoint(this.page, this.pageSize, this.startTime, this.endTime).subscribe(value => {
      console.log('2');
      if (value != null) {
        this.action = true;
        this.ticketDto$ = new BehaviorSubject<TicketDto[]>(value.content);
        this.total$ = new BehaviorSubject<number>(value.totalElements);
      } else {
        this.action = false;
      }
    });
  }

  showListSmallPoint() {
    this.ticketService.showListSmallPoint(this.page, this.pageSize, this.startTime, this.endTime).subscribe(value => {
      console.log('3');
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
      console.log('a');
      this.showListBigPoint();
    } else if (Number(this.point) === -1) {
      console.log('b');
      this.showListSmallPoint();
    } else {
      console.log('b');
      this.showListHistoryPoint();
    }
  }

}
