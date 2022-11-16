import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../service/customer.service';
import {CustomerTypeService} from '../../../service/customer-type.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
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
          name: new FormControl(value.customerName, [Validators.required,
            Validators.pattern(
              '[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
              'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
          dayOfBirth: new FormControl('', [Validators.required]),
          gender: new FormControl('', [Validators.required]),
          idCard: new FormControl('', [Validators.required,
            Validators.pattern('^(\\d{9}|\\d{12})$')]),
          email: new FormControl('', [Validators.required,
            Validators.pattern('^[A-Za-z0-9_.]{4,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$')]),
          address: new FormControl('', [Validators.required]),
          phoneNumber: new FormControl('', [Validators.required,
            Validators.pattern('^([+84][\\d]{9})|([0]\\d{9})$')]),
          username: new FormControl('', [Validators.required]),
        });
      this.userForm = new FormGroup(
        {
          username: new FormControl(),
          oldPassword: new FormControl(),
          psFormGroup: new FormGroup({
            newPassword: new FormControl('', [Validators.required,
              Validators.pattern('^[0-9a-zA-Z]{6,12}$')]),
            confirmPassword: new FormControl('', [Validators.required,
              Validators.pattern('^[0-9a-zA-Z]{6,12}$')])
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

}
