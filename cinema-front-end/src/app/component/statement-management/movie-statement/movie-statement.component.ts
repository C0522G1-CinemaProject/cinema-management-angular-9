import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Chart} from 'chart.js';
import {IMovieStatementDto} from '../../../dto/i-movie-statement-dto';
// @ts-ignore
import {BehaviorSubject, Observable} from 'rxjs/dist/types';
import {StatementService} from '../statement.service';

@Component({
  selector: 'app-movie-statement',
  templateUrl: './movie-statement.component.html',
  styleUrls: ['./movie-statement.component.css']
})
export class MovieStatementComponent implements OnInit {

  btnView = '';
  numberMonth = 0;
  labelCharts: string[] = [];
  dataCharts: number[] = [];
  listMovieTop$: Observable<Array<IMovieStatementDto>>;
  timeGroup!: FormGroup;
  chart: Chart;

  constructor(private fbuilder: FormBuilder,
              private statement: StatementService) {
  }

  ngOnInit(): void {
    this.btnView = 'Xem biểu đồ';
    this.timeGroup = this.fbuilder.group({
      time: [this.numberMonth]
    });
    this.getList(this.numberMonth);
  }

  display() {
    if (this.btnView === 'Xem biểu đồ') {
      this.btnView = 'Xem bảng số liệu';
    } else {
      this.btnView = 'Xem biểu đồ';
    }
  }

  getList(numberMonth: number) {
    this.statement.listMovieTop(this.numberMonth).subscribe((value: Array<IMovieStatementDto>) => {
      this.listMovieTop$ = new BehaviorSubject<Array<IMovieStatementDto>>(value);
      this.creatLabel(value);
    });
  }

  find() {
    this.numberMonth = this.timeGroup.value.time;
    this.getList(this.numberMonth);
  }

  creatLabel(value: Array<IMovieStatementDto>) {
    this.labelCharts = [];
    this.dataCharts = [];

    // @ts-ignore
    for (const item: IMovieStatementDto of value) {
      if (item.name != null) {
        this.labelCharts.push(item.name);
      } else {
        this.labelCharts.push(' ');
      }

      if (item.turnover != null) {
        this.dataCharts.push(item.turnover);
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
