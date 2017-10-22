import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';
import { ObjectStorage } from '../utilities/object-storage';
import { SharedService } from '../services/shared.service';
import { Shop } from '../beans';

// import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';

@Component({
    selector: 'app-shop-list',
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.scss'],
    providers: [DeliveryService]
})
export class ShopListComponent {
    breadcrumbArray: Array<any>;
    categoryId: number;
    city: any = {};
    shops: Array<any> = [];

    start: number = 0;
    offset: number = 20;

    isLoading: boolean;
    isAvailable: boolean;
    noMoreShops: boolean;
    isError: boolean;

    constructor(
        private route: ActivatedRoute,
        private deliveryService: DeliveryService,
        private storage: ObjectStorage,
        private sharedService: SharedService,
        // private breadcrumbService: BreadcrumbService
    ) {
        this.isLoading = true;
        this.noMoreShops = false;
        this.isError = false;
        this.city = this.storage.get('location.city');
        this.route.queryParams.subscribe(params => {
            if (params['category']) {
                this.categoryId = params['category'];
                this.initialize();
            } else {
                console.log(`something wrong with params[category]. It is not set`);
                return;
            }
        });

    }

    initialize() {
        console.log(`working with breadcrumb for categoryId ${this.categoryId}`);
        this.breadcrumbArray = [
            { title: 'Home', icon: 'home', path: 'home'},
            {title: 'Categories', icon: 'apps', path: 'category', queryParams: { category: this.categoryId}}
        ];        
        //const catId = this.category['categoryId'];
        this.deliveryService.getShops(this.city.id, this.categoryId, this.start, this.offset).catch((err): any => {
            this.isAvailable = false;
            this.isError = true;
            this.isLoading = false;
        }).subscribe((data) => {
          const shopsArray = data;
          console.log(`Shop List ${JSON.stringify(shopsArray)}`);
          this.shops = [];
          if (shopsArray) {
            if (shopsArray.length > 0) {
               let timeout = 0;
              shopsArray.forEach((shop: any, index: number) => {
                const keywordString = shop.keywords;
                const keywords = keywordString.split(' ');
                shopsArray[index]['keywordsArray'] = keywords;
                setTimeout(() => {
                  this.shops.push(shop);
                }, timeout += 100);
              });
              this.isAvailable = true;
              this.isError = false;              
            } else {
              this.isAvailable = false;
              this.shops = [];
            }
          } else {
            this.isAvailable = false;
            this.shops = [];
          }
          this.isLoading = false;
        });
      }

      shopSelected(shop: Shop) {
        console.log(`SELECTED SHOP  ${JSON.stringify(shop)}`);
        this.sharedService.setShop(shop);
      }
}
