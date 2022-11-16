import {Component, OnInit} from '@angular/core';
import {IEmployee} from '../../../model/i-employee';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeService} from '../../../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: IEmployee[];
  employeeIdDelete: number;
  p = 1;

  formDelete: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    gender: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    user: new FormControl(),
    image: new FormControl(),
    idCard: new FormControl(),
    dayOfBirth: new FormControl()
  });

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee(): void {
    this.employeeService.findAllEmployee().subscribe((value: any) => {
      this.employeeList = value.content;
    }, error => {
    }, () => {
      console.log(this.employeeList);
      // console.log('complete');
    });
  }

  deleteEmployee(): void {
    this.employeeIdDelete = Number(this.formDelete.value.id);
    this.employeeService.deleteEmployee(this.employeeIdDelete).subscribe(value => {
      // alert('delete successfully');
      this.ngOnInit();
    }, error => {
    }, () => {
    });
  }

}
