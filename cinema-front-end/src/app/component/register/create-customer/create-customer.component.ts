import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ICustomerType} from '../../../model/i-customer-type';
import {CustomerService} from '../../../service/customer.service';
import {CustomerTypeService} from '../../../service/customer-type.service';
import {ICustomer} from '../../../model/i-customer';
import {User} from '../../../dto/user';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.pattern(
        '[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
        'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      dayOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', Validators.required),
      idCard: new FormControl('', [Validators.required, Validators.pattern('')]),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      passGroup: new FormGroup(
        {
          password: new FormControl('', Validators.required),
          confirmPassword: new FormControl('')
        }, this.checkPasswords),
      customerType: new FormGroup({
        id: new FormControl(4)
      })
    });

  user = new User();
  customer: ICustomer;


  constructor(private customerService: CustomerService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.customer = this.customerForm.value;
    this.user.username = this.customerForm.value.username;
    this.user.password = this.customerForm.get('passGroup').get('password').value;
    this.customer.user = this.user;
    console.log(this.customerForm.get('passGroup').get('password').value);
    this.customerService.saveCustomer(this.customer).subscribe(value => {
      console.log(value);
      Swal.fire({
        icon: 'success',
        title: 'Đăng Ký Thành Công!',
        text: 'Tài Khoản: ' + this.user.username,
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat`
      });
      this.customerForm.reset();
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  checkPasswords(group: AbstractControl): any {
    const passwordCheck = group.value;
    return (passwordCheck.password === passwordCheck.confirmPassword ? null : {notSame: true});
  }

}
