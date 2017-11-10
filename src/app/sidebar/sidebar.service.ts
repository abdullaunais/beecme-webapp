import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { ObjectStorage } from '../utilities/object-storage';
import { Constant } from '../services/constant';

@Injectable()
export class SidebarService {
  // Observable users object source
  private _userObjectSource: BehaviorSubject<any>;
  // Observable user object stream
  userItem: any;

  constructor(private storage: ObjectStorage) {
      if (this.storage.get(Constant.USER_SET)) {
          const userObject = this.storage.get(Constant.USER_OBJECT);
          this._userObjectSource =  new BehaviorSubject<any>({ user: userObject, isLogin: true});
      } else {
          const userObject = {
              username: 'My Account'
          };
          this._userObjectSource =  new BehaviorSubject<any>({ user: userObject, isLogin: false});
      }
      this.userItem = this._userObjectSource.asObservable();
  }
  // service command
  changeLogin(data: any) {
    this._userObjectSource.next(data);
  }
}
