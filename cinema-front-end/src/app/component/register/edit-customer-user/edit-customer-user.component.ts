import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../service/customer.service';
import {CustomerTypeService} from '../../../service/customer-type.service';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {ICustomer} from '../../../model/i-customer';
import Swal from 'sweetalert2';
import {UserService} from '../../../service/user.service';
import {User} from '../../../dto/user';
import {UserDto} from '../../../dto/user-dto';

@Component({
  selector: 'app-edit-customer-user',
  templateUrl: './edit-customer-user.component.html',
  styleUrls: ['./edit-customer-user.component.css']
})
export class EditCustomerUserComponent implements OnInit {

  constructor(private customerService: CustomerService,
              private customerTypeService: CustomerTypeService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
  }

  customerForm: FormGroup;
  customer: ICustomer;
  userForm: FormGroup;
  username: string;
  user = new User();
  iUser: UserDto;
  action: boolean;

  ngOnInit(): void {
    this.customerService.findCustomerByUsername().subscribe(value => {
      this.customer = value;
      this.username = value.username;
      console.log(value);
      this.customerForm = new FormGroup(
        {
          name: new FormControl(value.customerName),
          dayOfBirth: new FormControl(),
          gender: new FormControl(),
          idCard: new FormControl(),
          email: new FormControl(),
          address: new FormControl(),
          phoneNumber: new FormControl(),
          username: new FormControl(),
        });
      this.userForm = new FormGroup(
        {
          username: new FormControl(),
          oldPassword: new FormControl(),
          psFormGroup: new FormGroup({
            newPassword: new FormControl(),
            confirmPassword: new FormControl()
          }, this.checkPasswords)
        });
      this.customerForm.patchValue(this.customer);
      this.userForm.patchValue(this.customer);
    });
  }

  updateUser(): void {
    this.iUser = this.userForm.value;
    console.log(this.userForm.get('psFormGroup').get('newPassword'));
    console.log(this.username);
    this.iUser.password = this.userForm.value.oldPassword;
    this.iUser.newPassword = this.userForm.get('psFormGroup').get('newPassword').value;
    this.userService.editUser(this.iUser).subscribe(value => {
      if (value == null) {
        this.action = true;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: 'Thông tin của: ' + this.iUser.username,
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        this.action = false;
      }

    }, error => {

    }, () => {
      this.router.navigateByUrl('/register/edit');
    });
  }

  updateCustomer(): void {
    const customer = this.customerForm.value;
    console.log(this.username);
    this.customerService.editCustomer(customer, this.username).subscribe(value => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cập nhật thành công!',
        text: 'Thông tin của: ' + customer.name,
        showConfirmButton: false,
        timer: 2000
      });
    }, error => {

    }, () => {
      this.router.navigateByUrl('/register/edit');
    });
  }

  checkPasswords(group: AbstractControl): any {
    const passwordCheck = group.value;
    return (passwordCheck.newPassword === passwordCheck.confirmPassword ? null : {notSame: true});
  }

  checkOldPassword(control: AbstractControl) {
  }
}
