import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as Chart from 'chart.js';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICustomerStatementDto} from '../../../dto/i-customer-statement-dto';
import {StatementService} from '../statement.service';

@Component({
  selector: 'app-customer-statement',
  templateUrl: './customer-statement.component.html',
  styleUrls: ['./customer-statement.component.css']
})
export class CustomerStatementComponent implements OnInit {

  btnView: string | undefined;
  numberMonth = 0;

  timeGroup!: FormGroup;
  chart: any;
  listCustomerTop$: Observable<Array<ICustomerStatementDto>>;
  private labelCharts: string[];
  private dataCharts: number[];

  constructor(private fBuilder: FormBuilder,
              private statement: StatementService) {
  }

  ngOnInit(): void {
    this.btnView = 'Xem biểu đồ';
    this.timeGroup = this.fBuilder.group({
      time: [this.numberMonth]
    });

  }

  display() {
    if (this.btnView === 'Xem biểu đồ') {
      this.btnView = 'Xem bảng số liệu';
    } else {
      this.btnView = 'Xem biểu đồ';
    }
  }

  getList(numberMonth: number) {
    this.statement.listCustomerTop(this.numberMonth).subscribe((value: Array<ICustomerStatementDto>) => {
      this.listCustomerTop$ = new BehaviorSubject<Array<ICustomerStatementDto>>(value);
      this.creatDataForChart(value);
    });
  }

  find() {
    this.numberMonth = this.timeGroup.value.time;
    this.getList(this.numberMonth);
  }

  creatDataForChart(value: Array<ICustomerStatementDto>) {
    this.labelCharts = [];
    this.dataCharts = [];


    for (const item of value) {
      if (item.name != null) {
        this.labelCharts.push(item.name);
      } else {
        this.labelCharts.push(' ');
      }

      if (item.totalMoney != null) {
        this.dataCharts.push(item.totalMoney);
      } else {
        this.dataCharts.push(0);

      }
    }
  }

  creatTable() {

  }

  createChart() {

    this.chart = new Chart('MyChart', {
      type: 'bar',

      data: {
        labels: this.labelCharts,
        datasets: [
          {
            label: 'Doanh thu',
            data: this.dataCharts,
            backgroundColor: 'blue'
          },

        ]
      },
      options: {
        indexAxis: 'x',
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'VND'
            }
          }
        }
      }
    });
  }
}
