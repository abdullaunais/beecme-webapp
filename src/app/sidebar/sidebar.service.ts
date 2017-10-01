import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { ObjectStorage } from '../utilities/object-storage';

@Injectable()
export class SidebarService {
  // Observable users object source
  private _userObjectSource: BehaviorSubject<any>;
  // Observable user object stream
  userItem: any;

  constructor(private storage: ObjectStorage) {
      if(this.storage.get('user.login')) {
          let userObject = this.storage.get('user.data');
          this._userObjectSource =  new BehaviorSubject<any>({ user: userObject, isLogin: true});
      } else {
          let userObject = {
              username: 'My Account'
          }
          this._userObjectSource =  new BehaviorSubject<any>({ user: userObject, isLogin: false});
      }
      this.userItem = this._userObjectSource.asObservable();
  }
  // service command
  changeLogin(data: any) {
    this._userObjectSource.next(data);
  }
}