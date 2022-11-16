import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../../../service/token-storage.service';
import {AuthService} from '../../../service/auth.service';
import {ShareService} from '../../../service/share.service';
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {Observable, ReplaySubject} from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private user: gapi.auth2.GoogleUser;
  private auth2: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleAuth>(1);
  formGroup: FormGroup;
  username: string ;
  roles: string[] = [];
  returnUrl: string;
  socialUser: SocialUser;
  constructor(private authSocialService: SocialAuthService,
              // private auth: AuthenticationService,
              private ref: ChangeDetectorRef,
              private formBuild: FormBuilder,
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
    gapi.load('auth', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '612774287153-uthnsrl25on17doe8413il68ebv9c969.apps.googleusercontent.com'
      });
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    this.formGroup = this.formBuild.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember_me: ['']
      }
    );

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
        if (this.formGroup.value.remember_me) {
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

  // signInWithGoogle(): void {
  //   this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
  //     this.socialUser = data;
  //     const tokenGoogle = new JwtResponseService(this.socialUser.idToken);
  //     console.log(tokenGoogle);
  //     this.auth.google(tokenGoogle).subscribe(req => {
  //         if (req.token === '') {
  //           this.tokenStorageService.saveUser(req.user);
  //           // this.router.navigateByUrl('/registration');
  //         } else {
  //           this.tokenStorageService.saveTokenLocal(req.token);
  //           req.user.username = null;
  //           this.tokenStorageService.saveUserLocal(req.user);
  //           this.tokenStorageService.saveUserLocal(req.username);
  //           // window.location.reload();
  //         }
  //       },
  //       error => {
  //         console.log(error);
  //         this.logOut();
  //       });
  //   }).catch(
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
  //
  // logOut(): void {
  //   this.authSocialService.signOut().then(
  //     data => {
  //       this.tokenStorageService.logOut();
  //       window.location.reload();
  //     }
  //   );
  // }
  public signIn() {
    this.auth2.signIn({
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    }).then( user => {
      // @ts-ignore
      this.subject.next(user);
    }).catch(() => {
      this.subject.next(null);
    });
  }

  public signOut() {
    this.auth2.signOut().then(() => {
      //
    });
  }
  public observable(): Observable<gapi.auth2.GoogleAuth> {
    return this.subject.asObservable();
  }
}
