import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ObjectStorage } from '../utilities/object-storage';
import { Constant } from './constant';

@Injectable()
export class LocationGuardService implements CanActivate {

  constructor(
    private router: Router,
    private storage: ObjectStorage
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLocationSet: boolean = this.storage.get(Constant.LOCATION_SET);
    if (isLocationSet) {
      return true;
    } else {
      this.storage.remove(Constant.COUNTRY);
      this.storage.remove(Constant.PROVINCE);
      this.storage.remove(Constant.CITY);
      this.storage.remove(Constant.LOCATION_SET);
      this.router.navigate(['/pages/location']);
      return false;
    }
  }
}
