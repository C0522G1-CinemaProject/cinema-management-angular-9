import {Component, Inject, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {EmployeeService} from '../../../service/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from '../../../model/i-user';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {IEmployee} from '../../../model/i-employee';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeFormGroup: FormGroup;
  employeeId: number;
  user: IUser;
  employee: IEmployee;
  selectedImage: any = null;
  // private storage: any;
  storage: any = null;


  constructor(private employeeService: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // this.employeeService.findUser().subscribe(value => {
    //   this.users = value;
    // });
    this.employeeId = Number(this.activatedRoute.snapshot.params.id);

    this.employeeService.getById(this.employeeId).subscribe(employee => {
      console.log(employee);
      console.log(employee.image);
      this.employeeFormGroup = new FormGroup({
        id: new FormControl(employee.id),
        name: new FormControl(employee.name),
        gender: new FormControl(employee.gender),
        email: new FormControl(employee.email),
        address: new FormControl(employee.address),
        phoneNumber: new FormControl(employee.phoneNumber),
        idCard: new FormControl(employee.idCard),
        dayOfBirth: new FormControl(employee.dayOfBirth),
        image: new FormControl(employee.image),
        username: new FormControl(employee.user.username),
        passwordGroup: new FormGroup({
          password: new FormControl(''),
          passwordConfirm: new FormControl('')
        }, this.checkPassword)
      });
    });
  }


  updateEmployee(id: number) {
    const employee = this.employeeFormGroup.value;
    this.employeeService.updateEmployee(id, employee).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Chỉnh sửa thành công!',
        text: 'Nhân viên: ' + employee.name,
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
      });
      this.router.navigateByUrl('employee/list');
    }, error => {
      console.log(error);
    }, () => {
      console.log('Cập nhật nhân viên thành công!');
    });
  }

  // updateEmployee(id: number) {
  //
  //   const employee = this.employeeFormGroup.value;
  //   // this.user.username = this.employeeFormGroup.value.username;
  //   // this.user.password = this.employeeFormGroup.get('passwordGroup').get('password').value;
  //   // this.employee.user = this.user;
  //
  //   const image = this.getCurrentDateTime() + this.selectedImage.name;
  //   const fileRef = this.storage.ref(image);
  //   // console.log(employee);
  //   this.storage.upload(image, this.selectedImage).snapshotChanges().pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         console.log(url);
  //         this.employeeFormGroup.patchValue({image: url});
  //         console.log(this.employeeFormGroup.value);
  //         this.employee.image = url;
  //         this.employeeService.updateEmployee(id, employee).subscribe(() => {
  //           Swal.fire({
  //             icon: 'success',
  //             title: 'Chỉnh sửa thành công!',
  //             text: 'Nhân viên: ' + this.employee.name,
  //             width: 600,
  //             padding: '3em',
  //             color: '#716add',
  //             background: '#fff url(/images/trees.png)',
  //             backdrop: `
  //               rgba(0,0,123,0.4)
  //               url("/images/nyan-cat.gif")
  //               left top
  //               no-repeat
  //             `
  //           });
  //           this.router.navigateByUrl('employee/list');
  //         }, error => {
  //           console.log(error);
  //         }, () => {
  //           console.log('Cập nhật nhân viên thành công!');
  //         });
  //       });
  //     })
  //   ).subscribe();
  // }


  checkPassword(abstractControl: AbstractControl): any {
    const checkPass = abstractControl.value;
    return checkPass.password === checkPass.passwordConfirm ? null : {notSame: true};
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }


}
