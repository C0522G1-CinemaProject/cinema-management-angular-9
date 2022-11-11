import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import Swal from 'sweetalert2';
import {TokenStorageService} from '../../../service/token-storage.service';
import {AuthService} from '../../../service/auth.service';
import {ShareService} from '../../../service/share.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  username: string ;
  // errorMessage: string ;
  roles: string[] = [];
  returnUrl: string;

  constructor(private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private shareService: ShareService) {
    this.formGroup = this.formBuild.group({
        username: [''],
        password: [''],
      rememberMe: ['']
      }
    );
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(
      data => {
        // console.log(data)
        if (this.formGroup.value.rememberMe) {
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        }

        this.authService.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formGroup.reset();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '*** ' + this.username + ' ***  Đăng nhập thành công !',
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigateByUrl(this.returnUrl);
        this.shareService.sendClickEvent();

      },
      err => {
        this.authService.isLoggedIn = false;
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Đăng nhập thất bại, Sai tài khoản hoặc mật khẩu !',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }
}
