import { Component } from '@angular/core';
import { DeliveryService } from '../services/delivery.service';
import { ActivatedRoute } from '@angular/router';
import { ObjectStorage } from '../utilities/object-storage';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  providers: [DeliveryService]
})
export class ItemListComponent {
  breadcrumbArray: { title: string; icon: string; path: string; }[];

  start: number = 0;
  offset: number = 20;

  // cartCount: number;
  isLoading: boolean;
  isAvailable: boolean;
  noMoreItems: boolean;

  shop: any = {};
  city: any = {};

  items: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private storage: ObjectStorage
  ) {
    this.isLoading = true;
    this.isAvailable = true;
    this.noMoreItems = false;
    this.city = this.storage.get('location.city');
    this.breadcrumbArray = [
      { title: 'Home', icon: 'home', path: 'home' },
      { title: 'Categories', icon: 'apps', path: 'category' },
      { title: 'Shops', icon: 'store', path: 'category' }
    ]
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['shop']) {
        this.shop['shopId'] = params.shop;
        this.initialize();
      }
    });
  }

  initialize() {
    const shopId = this.shop['shopId'];
    this.deliveryService.getItemByShop(shopId, this.start, this.offset).catch((err): any => {
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
      // this.isLoading = false;
      // this.isAvailable = false;
    }).subscribe((shopData) => {
      this.shop = shopData;
    });
  }

  updateQty(item: any, val: number) {
    if (item.selectedQty < item.qty) {
      item.selectedQty += val;
    }
  }

  validateCart(item) {
    console.log(JSON.stringify(item));
  }

}
