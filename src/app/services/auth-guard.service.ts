import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { ObjectStorage } from '../utilities/object-storage';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private storage: ObjectStorage
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isLoggedIn: boolean = this.storage.get('user.login');
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/pages/login']);
      return false;
    }
  }
}