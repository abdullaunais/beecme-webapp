import { Component, ViewEncapsulation } from '@angular/core';
import { DeliveryService } from '../services/delivery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectStorage } from '../utilities/object-storage';
import { SharedService } from '../services/shared.service';
import { NotificationsService } from 'angular2-notifications';
import { Constant } from '../services/constant';

declare var swal: any;

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  providers: [DeliveryService],
  encapsulation: ViewEncapsulation.None
})
export class ItemListComponent {
  breadcrumbArray: Array<any>;

  start: number = 0;
  offset: number = 20;

  // cartCount: number;
  isLoading: boolean;
  isAvailable: boolean;
  noMoreItems: boolean;
  shopLoading: boolean;

  shop: any = {};
  city: any = {};
  selectedCatId: number;

  public options = {
    position: ["bottom", "right"],
    timeOut: 0,
    lastOnBottom: true,
  };

  items: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private storage: ObjectStorage,
    private sharedService: SharedService,
    private notify: NotificationsService,
    private router: Router
  ) {
    this.isLoading = true;
    this.shopLoading = true;
    this.isAvailable = true;
    this.noMoreItems = false;
    this.city = this.storage.get('location.city');
    this.route.queryParams.subscribe(params => {

      console.log(`params ${JSON.stringify(params)}`);
      if (params['shop']) {
        this.shop['shopId'] = params['shop'];
        this.selectedCatId = params['category'];
        this.initialize();
      }

      if (params['shop'] && params['category']) {
        this.breadcrumbArray = [
          { title: 'Home', icon: 'home', path: 'home' },
          { title: 'Categories', icon: 'apps', path: 'categories' },
          { title: 'Shops', icon: 'store', path: 'category', queryParams: { category: params['category'] } },
          { title: 'Items', icon: 'bookmark', path: 'shop', queryParams: { category: params['category'], shop: params['shop'] } }
        ];
      }
    });

  }

  initialize() {
    const shopId = this.shop['shopId'];
    console.log(`params ${shopId} ${this.selectedCatId}`);
    this.deliveryService.getItemByShop(this.selectedCatId, shopId, this.start, this.offset).catch((err): any => {
      this.isLoading = false;
      this.isAvailable = false;
    }).subscribe((data) => {
      console.log(data['itemlist']);
      if (data['itemlist']) {
        if (data['itemlist'].length > 0) {
          this.isAvailable = true;
          let timeout = 0;
          data['itemlist'].forEach((item: any) => {
            item.selectedQty = 1;
            setTimeout(() => {
              this.items.push(item);
            }, timeout += 100);
          });
        } else {
          this.items = [];
          this.isAvailable = false;
        }
      } else {
        this.items = [];
        this.isAvailable = false;
      }
      this.isLoading = false;
    });

    this.deliveryService.getShopById(this.city.id, shopId).catch((err): any => {
      this.shopLoading = false;
      // this.isAvailable = false;
    }).subscribe((shopData) => {
      this.shop = shopData;
      this.shopLoading = false;
    });
  }

  updateQty(item: any, val: number) {
    console.log(`updateQty current value = ${item.qty} and selectedQty ${item.selectedQty} item.quantity is ${item.quantity}`);
    if (item.qty > item.selectedQty) {
      if (item.selectedQty >= 0 && val > 0) {
        item.selectedQty += val;
      }
    }

    if (item.selectedQty > 1 && val < 0) {
      item.selectedQty += val;
    }

  }

  addToCart(item: any) {
    console.log(JSON.stringify(item));
    item.quantity = item.selectedQty;
    // this.sharedService.pushItem(item);

    // this.item.quantity = this.selectedQty;
    if (!this.sharedService.pushItem(item)) {
      // Customer is trying to add items from different shops
      swal({
        type: 'warning',
        title: 'Existing Cart',
        text: 'Your cart already contains items from a different Shop. You can only  add items from one shop at a time. Do you wish to clear the existing cart and add this item?',
        showCancelButton: true,
        confirmButtonColor: '#00b55d',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Clear Cart'
      }).then(() => {
        //this.storage.remove('delivery.cart');
        //this.storage.remove('delivery.cartShop');
        //this.cartService.setCartCount(0);
        this.sharedService.resetCart();
        this.addToCart(item);
      }).catch(() => {
        return;
      });
    } else {
      const toast = this.notify.success('Item Added!', 'Click to Checkout', {
        timeOut: Constant.NOTIFICATION_DEFAULT_TIMEOUT,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      toast.click.subscribe((event: any) => {
        this.router.navigate(['/cart']);
      });
    }
  }

}
