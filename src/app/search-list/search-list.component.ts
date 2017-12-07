import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';
import { ObjectStorage } from '../utilities/object-storage';
import { Constant } from '../services/constant';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['../item-list/item-list.component.scss']
})
export class SearchListComponent {
  breadcrumbArray: Array<any>;

  start: number = 0;
  offset: number = 20;

  // cartCount: number;
  isLoading: boolean;
  isAvailable: boolean;
  noMoreItems: boolean;

  // shop: any = {};
  city: any = {};
  keyword: string = 'search';
  numberOfResults: number = 0;

  items: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private storage: ObjectStorage
  ) {
    this.isLoading = true;
    this.isAvailable = true;
    this.noMoreItems = false;
    this.city = this.storage.get(Constant.CITY);
    this.route.queryParams.subscribe(params => {
      if (params['query']) {
        this.keyword = params['query'];
        this.breadcrumbArray = [
          { title: 'Home', icon: 'home', path: 'home' },
          { title: 'Search', icon: 'search', path: 'search', queryParams: { query: params['query'] } }
        ];
        this.initialize();
      }
    });
  }

  // ngOnInit() {
  //   this.route.queryParams.subscribe(params => {
  //     if (params['shop']) {
  //       this.shop['shopId'] = params.shop;
  //       this.initialize();
  //     }
  //   });
  // }

  initialize() {
    this.deliveryService.searchItems(this.city.id, this.keyword, this.start, this.offset).catch((err): any => {
      this.isLoading = false;
      this.isAvailable = false;
    }).subscribe((data) => {
      this.items = [];
      console.log(data['itemlist']);
      if (data['itemlist']) {
        this.numberOfResults = data['itemlist'].length;
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

    // this.deliveryService.getShopById(this.city.id, shopId).catch((err): any => {
    //   // this.isLoading = false;
    //   // this.isAvailable = false;
    // }).subscribe((shopData) => {
    //   this.shop = shopData;
    // });
  }

  updateQty(item: any, val: number) {
    if (item.selectedQty < item.qty) {
      item.selectedQty += val;
    }
  }

  validateCart(item: any) {
    console.log(JSON.stringify(item));
  }

}
