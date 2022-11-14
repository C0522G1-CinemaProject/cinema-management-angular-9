import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../service/customer/customer.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ICustomer} from '../../../model/i-customer';
import {ICustomerType} from '../../../model/i-customer-type';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerTypeService} from '../../../service/customer/customer-type.service';
import {UserService} from '../../../service/user.service';
import {IUser} from '../../../model/i-user';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  formEdit: FormGroup;
  customer: ICustomer;
  dayOfBirth: string;
  CustomerTypes: ICustomerType[] = [];

  // Users: IUser[] = [];

  constructor(private customerService: CustomerService,
              private customerTypeService: CustomerTypeService,
              private activatedRoute: ActivatedRoute,
              // private userService: UserService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.customerService.findById(id).subscribe(value => {
      this.customer = value;
      this.dayOfBirth = value.dayOfBirth;
      console.log(this.customer);
      this.formEdit.patchValue(this.customer);
      this.formEdit.controls.username.setValue(this.customer.user.username);
    });
    this.formEdit = this.fb.group({
      id: [],
      name: [],
      dayOfBirth: [],
      address: [],
      gender: [],
      idCard: [],
      username: [],
      email: [],
      phoneNumber: [],
      customerType: []
    });
    this.getCustomerType();
  }

  private getCustomerType() {
    this.customerTypeService.getAll().subscribe(value => {
      this.CustomerTypes = value;
    });
  }

  // private getUser() {
  //   this.userService.getAll().subscribe(value => {
  //     this.Users = value;
  //   });
  // }

  compareWithId(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

  saveEditing() {
    const customer = this.formEdit.value;
    this.customerService.editObject(customer).subscribe(() => {
      this.router.navigateByUrl('/customer/list');
    });
  }
}
