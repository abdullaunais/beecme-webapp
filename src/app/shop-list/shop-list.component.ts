import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from "../services/delivery.service";

@Component({
    selector: 'app-shop-list',
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.css'],
    providers: [DeliveryService]
})
export class ShopListComponent {
    category: any = {};
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
        private deliveryService: DeliveryService
    ) {
        this.isLoading = true;
        this.noMoreShops = false;
        this.isError = false;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.category['categoryId'] = params.id;
                this.initialize();
            }
        });
    }

    initialize() {
        let catId = this.category['categoryId'];
        let cityId = 1; //this.city['id'];
        this.deliveryService.getShops(cityId, catId, this.start, this.offset).catch((err):any => {
            this.isAvailable = false;
            this.isError = true;
            this.isLoading = false;
        }).subscribe((data) => {
          let json = JSON.stringify(data);
          let shopsArray = JSON.parse(json);
          this.shops = [];
          if (shopsArray) {
            if (shopsArray.length > 0) {
              this.isAvailable = true;
              this.isError = false;
              let timeout = 0;
              shopsArray.forEach((shop: any, index: number) => {
                let keywordString = shop.keywords;
                let keywords = keywordString.split(" ");
                shopsArray[index]['keywordsArray'] = keywords;
                setTimeout(() => {
                  this.shops.push(shop);
                }, timeout += 100);
              });
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
}
