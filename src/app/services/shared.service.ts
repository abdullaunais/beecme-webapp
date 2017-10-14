import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'Rxjs/Observable';
import { Item, Shop } from '../beans';


@Injectable()
export class SharedService {

  constructor() { }

  subjectCartSummary = new Subject<number>();

  pushItem(item: Item) {

    // Read the existing cart and retrieve into a temp var. 
    // Remove the item from temp var if it exists
    // Push the new item to the temp var.
    // Remove the 'cart' from sessionStorage
    // set the temp var as the 'cart' in sessionStorage	
    // finalTotal calculation
    // Notify the event to subscribers: 

    let cache: Item[] = JSON.parse(sessionStorage.getItem('delivery.cart'))
    if (cache === null) {
      cache = []
    } else {
       if (!this.validateCartShop()) {
         return false;
       }
    }
    this.remove(cache, 'itemCode', item.itemCode)
    cache.push(item)

    sessionStorage.setItem('delivery.cart', JSON.stringify(cache))
    this.refreshFinalTotal(cache);
    return true;
  }

  removeItem(c: Item) {
    // Read the existing cart and retrieve into a temp var. 
    // Remove the item from temp var if it exists
    // Remove the 'cart' from sessionStorage
    // set the temp var as the 'cart' in sessionStorage	
    // Notify the event to subscribers: 

    let cache: Item[] = JSON.parse(sessionStorage.getItem('delivery.cart'));
    this.remove(cache, 'itemCode', c.itemCode);

    sessionStorage.removeItem('delivery.cart');
    sessionStorage.setItem('delivery.cart', JSON.stringify(cache));
    this.refreshFinalTotal(cache);
  }

  public remove(arr: any, attr: any, value: any) {
    var i = arr.length;
    while (i--) {
      if (arr[i]
        && arr[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arr[i][attr] === value)) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  //   public validateCartShop() {
  //     if (this.getCart() != null && this.getCart().length > 0 &&
  //        this.getCart()[0].shopId != this.getShop().shopId) {
  //        return false;
  //        } else {
  //          return true;
  //        }
  //  }

  getCart(): Item[] {
    return JSON.parse(sessionStorage.getItem('delivery.cart'));
  }

  private refreshFinalTotal(cart: Item[]) {

    let cartTotal = 0;

    if (cart.length === 0) {
      sessionStorage.setItem('carttotal', "0")
      console.log('refresh cart total to 0')
      this.subjectCartSummary.next(0);
      return;
    }

    for (let item of cart) {
      cartTotal = cartTotal + (item.quantity * item.price)
    }

    let df = JSON.parse(sessionStorage.getItem('delivery.shop')).deliveryCharge;
    cartTotal = cartTotal + df;
    console.log(`refreshFinalTotal calculated FT is ${cartTotal}`);
    sessionStorage.setItem('carttotal', cartTotal + "");
    console.log(`cart.length is ${cart.length}`);
    this.subjectCartSummary.next(cart.length);
    console.log(`refreshFinalTotal updated FT is ${this.getCartTotal()}`);
  }

  getSubjectCartSummary(): Observable<number> {
    console.log('Firing > getSubjectCartSummary()');
    return this.subjectCartSummary.asObservable();
  }

  getCartTotal() {
    // this.cartChanged.emit(this.finalTotal);
    let total: number = +(sessionStorage.getItem('carttotal'));
    return total;
  }

  setShop(shop: Shop) {
    sessionStorage.setItem('delivery.shop', JSON.stringify(shop));
  }

  getShop(): Shop {
    let s = JSON.parse(sessionStorage.getItem('delivery.shop'));
    return s;
  }

  public validateCartShop() {
    console.log(`validateCartShop this.getCart().length() is ${this.getCart()}`);
    if (this.getCart() != null && this.getCart().length > 0 &&
      this.getCart()[0].shopId != this.getShop().shopId) {
      return false;
    } else {
      return true;
    }
  }

  resetCart() {
    sessionStorage.removeItem('delivery.cart');
    this.subjectCartSummary.next(0);
  }
}
