import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from './token-storage.service';

export class AuthGuardService implements CanActivate{
  constructor(private router: Router,
              private tokenStorage: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tokenStorage.isLogged()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;

  }
}
