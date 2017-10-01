import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { ObjectStorage } from '../utilities/object-storage';

@Injectable()
export class LocationGuardService implements CanActivate {

  constructor(
    private router: Router,
    private storage: ObjectStorage
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isLocationSet: boolean = this.storage.get('location.set');
    if (isLocationSet) {
      return true;
    } else {
      this.storage.remove('location.country');
      this.storage.remove('location.province');
      this.storage.remove('location.city');
      this.storage.remove('location.set');
      this.router.navigate(['/pages/location']);
      return false;
    }
  }
}