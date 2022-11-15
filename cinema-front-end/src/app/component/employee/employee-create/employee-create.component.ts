import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../../../service/employee.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {IEmployee} from '../../../model/i-employee';
import {User} from '../../../dto/user';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  user = new User();
  employee: IEmployee;


  constructor(private employeeService: EmployeeService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  selectedImage: any = null;

  employeeFormGroup: FormGroup = new FormGroup({
    name: new FormControl('',
      [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('(0|[(]84[)][+])9[01]\\d{7}')]),
    idCard: new FormControl('', [Validators.required, Validators.pattern('\\d{9}')]),
    dayOfBirth: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    passwordGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      passwordConfirm: new FormControl('', [Validators.required])
    }, this.checkPassword)
  });

  ngOnInit(): void {
  }



  submit(): void {
    this.employee = this.employeeFormGroup.value;
    this.user.username = this.employeeFormGroup.value.username;
    this.user.password = this.employeeFormGroup.get('passwordGroup').get('password').value;
    this.employee.user = this.user;
    const image = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(image);
    this.storage.upload(image, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.employeeFormGroup.patchValue({image: url});
          console.log(this.employeeFormGroup.value);
          this.employee.image = url;

          this.employeeService.addEmployee(this.employee).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Thêm mới thành công!',
              text: 'Nhân viên: ...',
            });
          }, error => {
            console.log(error);
          }, () => {
            this.router.navigateByUrl('employee/list');
            console.log('Thêm mới nhân viên thành công!');
          });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  checkPassword(abstractControl: AbstractControl): any {
    const checkPass = abstractControl.value;
    return checkPass.password === checkPass.passwordConfirm ? null : {notSame: true};
  }

}
