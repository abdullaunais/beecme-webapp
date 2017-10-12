import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { ObjectStorage } from '../utilities/object-storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CartService {
  // Observable users object source
  private _cartCountSource: BehaviorSubject<any>;
  // Observable user object stream
  cartCount: Observable<string>;

  constructor(private storage: ObjectStorage) {
      if (this.storage.get('delivery.cart')) {
          const cartArray: Array<any> = this.storage.get('delivery.cart');
          this._cartCountSource =  new BehaviorSubject<number>(cartArray.length);
      } else {
          this._cartCountSource =  new BehaviorSubject<number>(0);
      }
      this.cartCount = this._cartCountSource.asObservable();
  }
  // service command
  setCartCount(data: any) {
    this._cartCountSource.next(data);
  }
}