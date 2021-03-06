import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';
import { ObjectStorage } from '../utilities/object-storage';
import { SharedService } from '../services/shared.service';
import { Shop } from '../beans';
import { Constant } from '../services/constant';

@Component({
    selector: 'app-shop-list',
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.scss'],
    providers: [DeliveryService],
    encapsulation: ViewEncapsulation.None
    // Reference : https://blog.thoughtram.io/angular/2015/06/29/shadow-dom-strategies-in-angular2.html
})
export class ShopListComponent implements OnInit {
    breadcrumbArray: Array<any>;
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
        private deliveryService: DeliveryService,
        private storage: ObjectStorage,
        private sharedService: SharedService,
        // private breadcrumbService: BreadcrumbService
    ) {
        this.isLoading = true;
        this.noMoreShops = false;
        this.isError = false;
        this.city = this.storage.get(Constant.CITY);
        this.route.queryParams.subscribe(params => {
            if (params['category']) {
                this.category['categoryId'] = params['category'];
                // this.initialize();
            } else {
                console.log(`params category is null returning`);
               // load all shops return;
               this.category['categoryId'] = '-999';
            }
        });
        this.breadcrumbArray = [
            { title: 'Home', icon: 'home', path: 'home' },
            { title: 'Categories', icon: 'apps', path: 'categories' },
            { title: 'Shops', icon: 'store', path: 'category', queryParams: { category: this.category['categoryId'] } }
        ];

    }

    ngOnInit() {
        this.initialize();
        console.log('exiting from shop-list.component');
    }

    initialize() {

        const catId = this.category['categoryId'];
        this.deliveryService.getShops(this.city.id, catId, this.start, this.offset).catch((err): any => {
            this.isAvailable = false;
            this.isError = true;
            this.isLoading = false;
        }).subscribe((data) => {
            const shopsArray = data;
            console.log(shopsArray);
            this.shops = [];
            if (shopsArray) {
                if (shopsArray.length > 0) {
                    this.isAvailable = true;
                    this.isError = false;
                    let timeout = 0;
                    shopsArray.forEach((shop: any, index: number) => {
                        const keywordString = shop.keywords;
                        const keywords = keywordString.split(' ');
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

    shopSelected(shop: Shop) {
        console.log(`SELECTED SHOP  ${JSON.stringify(shop)}`);
        this.sharedService.setShop(shop);
    }
}
