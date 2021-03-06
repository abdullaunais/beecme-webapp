import { Component, ViewEncapsulation, OnInit } from '@angular/core';
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
export class ItemListComponent implements OnInit {
  breadcrumbArray: Array<any>;

  start: number = 0;
  pageStart: number = 0;
  offset: number = 20;
  size: number = 1;

  // cartCount: number;
  isLoading: boolean;
  isAvailable: boolean;
  noMoreItems: boolean;

  shop: any = {};
  city: any = {};
  selectedCatId: number;

  public options = {
    position: ['bottom', 'right'],
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
  ) { }

  ngOnInit() {
    this.city = this.storage.get(Constant.CITY);
    this.route.queryParams.subscribe(params => {
      console.log(`params ${JSON.stringify(params)}`);
      this.shop['shopId'] = 22; //params['shop'];
      this.selectedCatId = params['category'];
      if (!this.selectedCatId || this.selectedCatId < 0) {
        this.selectedCatId = -1;
      }
      this.initialize();
    });
  }

  initialize() {
    this.isLoading = true;
    this.isAvailable = true;
    this.noMoreItems = false;

    const shopId = 22; // this.shop['shopId'];
    console.log(`params ${shopId} ${this.selectedCatId}`);
    this.deliveryService.getItemByCategory(this.selectedCatId, this.start, this.offset).catch((err): any => {
      this.isLoading = false;
      this.isAvailable = false;
    }).subscribe((data) => {
      console.log(data['itemlist']);
      if (data['itemlist']) {
        if (data['itemlist'].length > 0) {
          this.items = [];
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
      if (data.totalPages) {
        this.size = data.totalPages;
      }
      this.isLoading = false;
    });

    // this.deliveryService.getShopById(this.city.id, shopId).catch((err): any => {
    //   this.shopLoading = false;
    //   // this.isAvailable = false;
    // }).subscribe((shopData) => {
    //   this.shop = shopData;
    //   this.shopLoading = false;
    // });
  }

  paginationChange(val: number) {
    this.pageStart += this.offset * val;
    this.start += val;

    this.isLoading = true;
    this.noMoreItems = false;
    this.items = [];
    const shopId = 22; // this.shop['shopId'];
    this.deliveryService.getItemByCategory(this.selectedCatId, this.pageStart, this.offset).catch((err): any => {
      this.isLoading = false;
      this.noMoreItems = true;
    }).subscribe((data) => {
      console.log(data['itemlist']);
      if (data['itemlist']) {
        if (data['itemlist'].length > 0) {
          this.noMoreItems = false;
          let timeout = 0;
          data['itemlist'].forEach((item: any) => {
            item.selectedQty = 1;
            setTimeout(() => {
              this.items.push(item);
            }, timeout += 100);
          });
        } else {
          this.items = [];
          this.noMoreItems = true;
        }
      } else {
        this.items = [];
        this.noMoreItems = true;
      }
      this.isLoading = false;
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
        // this.storage.remove(Constant.CART_ITEMS);
        // this.storage.remove(Constant.CART_SHOP);
        // this.cartService.setCartCount(0);
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
