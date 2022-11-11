import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../../service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    const currentUser = this.tokenStorageService.getUser();
    // console.log(route);
    if (currentUser !== null) {
      const role: string[] = currentUser.roles;
      console.log(role);
      // console.log(role.indexOf(route.data['roles'][0]));
      for (let i = 0; i < role.length; i++) {
        console.log('lặp');
        let j = 0;
        while (j < route.data.roles.length) {
          if (role[i] === route.data.roles[j]) {
            console.log('có quyền');
            return true;
          }
          j++;
        }
      }
      this.router.navigate(['/login'], {
        queryParams: {returnUrl: state.url}
      });
      return false;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
