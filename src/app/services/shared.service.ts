import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Item, Shop } from '../beans';
import { Observable } from 'rxjs/Observable';
import { ObjectStorage } from '../utilities/object-storage';
import { Constant } from './constant';

@Injectable()
export class SharedService {
  subjectCartSummary = new Subject<string>();
  constructor(
    private storage: ObjectStorage
  ) {}



  pushItem(item: Item) {

    // Read the existing cart and retrieve into a temp var.
    // Remove the item from temp var if it exists
    // Push the new item to the temp var.
    // Remove the 'cart' from storage
    // set the temp var as the 'cart' in storage
    // finalTotal calculation
    // Notify the event to subscribers:

    let cache: Item[] = this.storage.get(Constant.CART_ITEMS);
    if (cache === null) {
      cache = [];
    } else {
      if (!this.validateCartShop()) {
        return false;
      }
    }
    this.remove(cache, 'itemCode', item.itemCode);
    cache.push(item);

    this.storage.set(Constant.CART_ITEMS, cache);
    this.refreshFinalTotal(cache);
    return true;
  }

  removeItem(c: Item) {
    // Read the existing cart and retrieve into a temp var. 
    // Remove the item from temp var if it exists
    // Remove the 'cart' from storage
    // set the temp var as the 'cart' in storage	
    // Notify the event to subscribers: 

    const cache: Item[] = this.storage.get(Constant.CART_ITEMS);
    this.remove(cache, 'itemCode', c.itemCode);

    this.storage.remove(Constant.CART_ITEMS);
    this.storage.set(Constant.CART_ITEMS, cache);
    this.refreshFinalTotal(cache);
  }

  public remove(arr: any, attr: any, value: any) {
    let i = arr.length;
    while (i--) {
      if (arr[i]
        && arr[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arr[i][attr] === value)) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  getCart(): Item[] {
    return this.storage.get(Constant.CART_ITEMS);
  }

  public refreshFinalTotal(cart: Item[]) {

    let cartTotal = 0;

    if (cart.length === 0) {
      this.storage.set(Constant.CART_TOTAL, 0);
      console.log('refresh cart total to 0');
      this.subjectCartSummary.next('0 item');
      return;
    }

    for (const item of cart) {
      cartTotal = cartTotal + (item.quantity * item.price);
    }

    const df = 0; //this.storage.get(Constant.CART_SHOP).deliveryCharge;
    cartTotal = cartTotal + df;
    console.log(`refreshFinalTotal calculated FT is ${cartTotal}`);
    this.storage.set(Constant.CART_TOTAL, cartTotal);
    console.log(`cart.length is ${cart.length}`);
    //this.subjectCartSummary.next(cart.length + ' of ' + this.getShop().currency + cartTotal);
    this.subjectCartSummary.next(cart.length + ' of Rs. ' +  cartTotal);
    console.log(`refreshFinalTotal updated FT is ${this.getCartTotal()}`);
  }

  getSubjectCartSummary(): Observable<string> {
    console.log('Firing > getSubjectCartSummary()');
    return this.subjectCartSummary.asObservable();
  }

  getCartTotal() {
    // this.cartChanged.emit(this.finalTotal);
    const total: number = +(this.storage.get(Constant.CART_TOTAL));
    return total;
  }

  setShop(shop: Shop) {
    this.storage.set(Constant.CART_SHOP, shop);
  }

  getShop(): Shop {
    const s = this.storage.get(Constant.CART_SHOP);
    return s;
  }

  public validateCartShop() {
    console.log(`validateCartShop this.getCart().length() is ${this.getCart()}`);
    if (this.getCart() != null && this.getCart().length > 0 &&
      this.getCart()[0].shopId !== this.getShop().shopId) {
      return false;
    } else {
      return true;
    }
  }

  resetCart() {
    this.storage.remove(Constant.CART_ITEMS);
    this.storage.remove(Constant.CART_SHOP);
    this.storage.remove(Constant.CART_TOTAL);
    this.subjectCartSummary.next('0 items');
  }
}
