import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as Chart from 'chart.js';

import {IMovieStatementDto} from '../../../dto/i-movie-statement-dto';

import {StatementService} from '../statement.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-movie-statement',
  templateUrl: './movie-statement.component.html',
  styleUrls: ['./movie-statement.component.css']
})
export class MovieStatementComponent implements OnInit {

  btnView = 'Xem biểu đồ';
  numberMonth = 0;
  labelCharts: string[] = [];
  dataCharts: number[] = [];
  listMovieTop$: Observable<Array<IMovieStatementDto>>;
  timeGroup!: FormGroup;
  chart: any;
  canvas: any;
  ctx: any;

  constructor(private fbuilder: FormBuilder,
              private statement: StatementService) {
  }

  ngOnInit(): void {
    this.btnView = 'Xem biểu đồ';
    this.timeGroup = this.fbuilder.group({
      time: [this.numberMonth]
    });
    this.getList(this.numberMonth);
    /*  this.canvas = document.getElementById('myChart');
      console.log(this.canvas);
      this.ctx = this.canvas.getContext('2d');*/

    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        // tslint:disable-next-line:max-line-length
        labels: ['USA', 'Spain', 'Italy', 'France', 'Germany', 'UK', 'Turkey', 'Iran', 'China', 'Russia', 'Brazil', 'Belgium', 'Canada', 'Netherlands', 'Switzerland', 'India', 'Portugal', 'Peru', 'Ireland', 'Sweden', 'USA', 'Spain', 'Italy', 'France', 'Germany', 'UK', 'Turkey', 'Iran', 'China', 'Russia', 'Brazil', 'Belgium', 'Canada', 'Netherlands',],
        datasets: [{
          label: 'Total cases.',
          // tslint:disable-next-line:max-line-length
          data: [886789, 213024, 189973, 158183, 153129, 138078, 101790, 87026, 82804, 62773, 50036, 42797, 42110, 35729, 28496, 23502, 22353, 20914, 17607, 16755, 886789, 213024, 189973, 158183, 153129, 138078, 101790, 87026, 82804, 62773, 50036, 42797, 42110, 35729],
          backgroundColor: 'red',
          hoverBackgroundColor: 'blue',
          hoverBorderColor: 'white',
          hoverBorderWidth: 3,
          borderColor: '#666',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            beginAtZero: true,
            ticks: {
              callback(value, index, values) {
                return value + ' VND';
              }
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        indexAxis: 'x',
        aspectRatio: 1.8,
        display: true
      }
    });
    console.log(this.chart);
    // this.createChart();
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


    for (const item of value) {
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

    this.chart = new Chart('myChart', {
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
        scales: {
          yAxes: [{
            beginAtZero: true,
            ticks: {
              callback(value, index, values) {
                return value + ' VND';
              }
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        indexAxis: 'x',
        aspectRatio: 2.5,
        display: true
      }
    });
  }
}
