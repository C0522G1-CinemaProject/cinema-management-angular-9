import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICustomer} from '../../../model/i-customer';
import {CustomerService} from '../../../service/customer/customer.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  page = 1;
  pageSize = 5;
  nameSearch = '';
  total$: Observable<number>;
  customers$: Observable<ICustomer[]>;

  constructor(private customerService: CustomerService,
              private title: Title) {
    this.title.setTitle('Thống kê phim');

  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getCustomer(this.nameSearch, this.page, this.pageSize).subscribe(value => {
        console.log(value);
        this.customers$ = new BehaviorSubject<ICustomer[]>(value.content);
        this.total$ = new BehaviorSubject<number>(value.totalElements);
      },
      error => {
      });
  }
}
